
        // Datos del juego
        const phrases = [
            { original: "¿Habu ja?", translation: "¿Dónde está? (objeto)" },
            { original: "¿Habu 'bui?", translation: "¿Dónde estás? (ser vivo)" },
            { original: "Habu kohi?", translation: "¿Dónde queda?" },
            { original: "¿Habu 'ba?", translation: "¿Dónde venden?" },
            { original: "¿Habu dä za gä ju rä bojä?", translation: "¿Dónde puedo tomar el transporte?" },
            { original: "¿Habu thogi?", translation: "¿Dónde pasa?" },
            { original: "¿Habu rä 'bai?", translation: "¿Dónde es su parada?" },
            { original: "¿Te ma ora (ya'ä) thogi?", translation: "¿A qué hora pasa?" },
            { original: "¿Gí tsixki?", translation: "¿Me lleva?" },
            { original: "¿Gí thogi ha? Ha, ha rä,", translation: "¿Pasa en? En, por" },
            { original: "Gä käi nuua", translation: "Me bajo aquí" },
            { original: "Gä käi nuni", translation: "Me bajo allí" },
            { original: "Bi ja nuni", translation: "Está ahí (objeto)" },
            { original: "Bi 'bui nuni", translation: "Esta ahí (ser vivo)" },
            { original: "Bi kohini", translation: "Queda allá (a la vista)" },
            { original: "Bi kohi'ä", translation: "Queda allá (fuera de vista)" },
            { original: "Bi 'ba nuni ha rä denda", translation: "Se vende allá en la tienda" },
            { original: "Dä za gi juu nuni", translation: "Puedes tomar allí" },
            { original: "Thogi nuni", translation: "Pasa allá" },
            { original: "Thogi nuua", translation: "Pasa aquí" },
            { original: "Rä 'bai nuni", translation: "Hace parada ahí" },
            { original: "Rä 'bai nuua", translation: "Hace parada aquí" },
            { original: "Thogi tat'ä", translation: "Pasa cada" },
            { original: "Hä gä tsix'i", translation: "Sí, si te llevo" },
            { original: "Hina, hingä tsix'i", translation: "No, no te llevo" },
            { original: "Hä gä thogi, hina, hingä thogini", translation: "Si voy a pasar, no no voy a pasar" }
        ];

        // Variables del juego
        let score = 0;
        let attempts = 0;
        let correctAnswers = 0;
        let selectedPhrase = null;
        let selectedTranslation = null;
        let currentPairs = [];

        // Elementos del DOM
        const phrasesContainer = document.getElementById('phrases-container');
        const translationsContainer = document.getElementById('translations-container');
        const scoreElement = document.getElementById('score');
        const attemptsElement = document.getElementById('attempts');
        const correctElement = document.getElementById('correct');
        const messageElement = document.getElementById('message');
        const checkButton = document.getElementById('check-btn');
        const resetButton = document.getElementById('reset-btn');
        const nextButton = document.getElementById('next-btn');

        // Inicializar el juego
        function initGame() {
            score = 0;
            attempts = 0;
            correctAnswers = 0;
            updateStats();
            generateNewPairs();
            messageElement.textContent = '';
        }

        // Actualizar estadísticas
        function updateStats() {
            scoreElement.textContent = score;
            attemptsElement.textContent = attempts;
            correctElement.textContent = correctAnswers;
        }

        // Generar nuevos pares de frases
        function generateNewPairs() {
            // Limpiar contenedores
            phrasesContainer.innerHTML = '';
            translationsContainer.innerHTML = '';
            
            // Seleccionar 5 frases aleatorias
            const shuffledPhrases = [...phrases].sort(() => 0.5 - Math.random()).slice(0, 5);
            currentPairs = shuffledPhrases;
            
            // Crear elementos para las frases originales
            shuffledPhrases.forEach(phrase => {
                const phraseElement = document.createElement('div');
                phraseElement.className = 'phrase';
                phraseElement.textContent = phrase.original;
                phraseElement.dataset.id = phrase.original;
                phraseElement.addEventListener('click', () => selectPhrase(phraseElement));
                phrasesContainer.appendChild(phraseElement);
            });
            
            // Crear elementos para las traducciones (mezcladas)
            const shuffledTranslations = [...shuffledPhrases]
                .map(p => p.translation)
                .sort(() => 0.5 - Math.random());
                
            shuffledTranslations.forEach(translation => {
                const translationElement = document.createElement('div');
                translationElement.className = 'phrase';
                translationElement.textContent = translation;
                translationElement.dataset.id = translation;
                translationElement.addEventListener('click', () => selectTranslation(translationElement));
                translationsContainer.appendChild(translationElement);
            });
            
            // Reiniciar selecciones
            selectedPhrase = null;
            selectedTranslation = null;
        }

        // Seleccionar frase original
        function selectPhrase(element) {
            // Quitar selección anterior
            document.querySelectorAll('#phrases-container .phrase').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Seleccionar nueva frase
            element.classList.add('selected');
            selectedPhrase = element;
            
            // Mostrar mensaje si ya hay una traducción seleccionada
            if (selectedTranslation) {
                messageElement.textContent = '¡Ahora haz clic en "Comprobar"!';
            }
        }

        // Seleccionar traducción
        function selectTranslation(element) {
            // Quitar selección anterior
            document.querySelectorAll('#translations-container .phrase').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Seleccionar nueva traducción
            element.classList.add('selected');
            selectedTranslation = element;
            
            // Mostrar mensaje si ya hay una frase seleccionada
            if (selectedPhrase) {
                messageElement.textContent = '¡Ahora haz clic en "Comprobar"!';
            }
        }

        // Comprobar respuesta
        function checkAnswer() {
            if (!selectedPhrase || !selectedTranslation) {
                messageElement.textContent = 'Por favor, selecciona una frase y su traducción.';
                return;
            }
            
            attempts++;
            
            // Encontrar el par correcto
            const correctPair = currentPairs.find(pair => 
                pair.original === selectedPhrase.dataset.id
            );
            
            if (correctPair && correctPair.translation === selectedTranslation.dataset.id) {
                // Respuesta correcta
                selectedPhrase.classList.remove('selected');
                selectedPhrase.classList.add('correct');
                selectedTranslation.classList.remove('selected');
                selectedTranslation.classList.add('correct');
                
                score += 10;
                correctAnswers++;
                messageElement.textContent = '¡Correcto! +10 puntos';
            } else {
                // Respuesta incorrecta
                selectedPhrase.classList.remove('selected');
                selectedPhrase.classList.add('incorrect');
                selectedTranslation.classList.remove('selected');
                selectedTranslation.classList.add('incorrect');
                
                // Mostrar la respuesta correcta
                const correctTranslationElement = document.querySelector(`#translations-container .phrase[data-id="${correctPair.translation}"]`);
                if (correctTranslationElement) {
                    correctTranslationElement.classList.add('correct');
                }
                
                messageElement.textContent = `Incorrecto. La respuesta correcta era: "${correctPair.translation}"`;
            }
            
            updateStats();
            
            // Deshabilitar más selecciones
            document.querySelectorAll('.phrase').forEach(el => {
                el.style.pointerEvents = 'none';
            });
        }

        // Event listeners
        checkButton.addEventListener('click', checkAnswer);
        
        resetButton.addEventListener('click', () => {
            initGame();
        });
        
        nextButton.addEventListener('click', () => {
            generateNewPairs();
            messageElement.textContent = '';
        });

        // Iniciar el juego al cargar la página
        window.addEventListener('load', initGame);
