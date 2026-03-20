        // Datos del juego - frases en Hñähñu con sus opciones
        const phrases = [
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy niña",
                options: ["nxutsi", "ts'unt'u", "'behña", "'ñoho"],
                correct: "nxutsi",
                fullPhrase: "Nuga drä nxutsi"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy niño",
                options: ["nxutsi", "ts'unt'u", "'behña", "'ñoho"],
                correct: "ts'unt'u",
                fullPhrase: "Nuga drä ts'unt'u"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy mujer",
                options: ["nxutsi", "ts'unt'u", "'behña", "'ñoho"],
                correct: "'behña",
                fullPhrase: "Nuga drä 'behña"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy hombre",
                options: ["nxutsi", "ts'unt'u", "'behña", "'ñoho"],
                correct: "'ñoho",
                fullPhrase: "Nuga drä 'ñoho"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy de la cultura Hñähñu",
                options: ["ñähñu", "mengu Panales", "'Iyongunsadi", "di ñähñu"],
                correct: "ñähñu",
                fullPhrase: "Nuga drä ñähñu"
            },
            {
                hnahna: "Ma hñaki ____",
                translation: "Mi lengua es Hñähñu",
                options: ["Hñähñu", "Hidalgo", "México", "Ixmiquilpan"],
                correct: "Hñähñu",
                fullPhrase: "Ma hñaki Hñähñu"
            },
            {
                hnahna: "Ma nzäi m'ui ____",
                translation: "Mi cultura es Hñähñu",
                options: ["Hñähñu", "Hidalgo", "México", "Ixmiquilpan"],
                correct: "Hñähñu",
                fullPhrase: "Ma nzäi m'ui Hñähñu"
            },
            {
                hnahna: "Nuga ____ ñähñu",
                translation: "Yo hablo Hñähñu",
                options: ["di", "hindi", "drä", "mengu"],
                correct: "di",
                fullPhrase: "Nuga di ñähñu"
            },
            {
                hnahna: "Nuga ____ ñähñu",
                translation: "Yo no hablo Hñähñu",
                options: ["di", "hindi", "drä", "mengu"],
                correct: "hindi",
                fullPhrase: "Nuga hindi ñähñu"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy estudiante",
                options: ["'Iyongunsadi", "mengu Panales", "ñähñu", "hindi ñähñu"],
                correct: "'Iyongunsadi",
                fullPhrase: "Nuga drä 'Iyongunsadi"
            },
            {
                hnahna: "Nuga drä ____",
                translation: "Yo soy de Panales",
                options: ["'Iyongunsadi", "mengu Panales", "ñähñu", "hindi ñähñu"],
                correct: "mengu Panales",
                fullPhrase: "Nuga drä mengu Panales"
            },
            {
                hnahna: "Ma ñaxu hnini ____",
                translation: "Mi cabecera municipal es Ixmiquilpan",
                options: ["Ixmiquilpan", "Hidalgo", "México", "Hñähñu"],
                correct: "Ixmiquilpan",
                fullPhrase: "Ma ñaxu hnini Ixmiquilpan"
            },
            {
                hnahna: "Ma hyodi ____",
                translation: "Mi Estado es Hidalgo",
                options: ["Ixmiquilpan", "Hidalgo", "México", "Hñähñu"],
                correct: "Hidalgo",
                fullPhrase: "Ma hyodi Hidalgo"
            },
            {
                hnahna: "Ma hai ____",
                translation: "Mi país es México",
                options: ["Ixmiquilpan", "Hidalgo", "México", "Hñähñu"],
                correct: "México",
                fullPhrase: "Ma hai México"
            }
        ];

        // Variables del juego
        let currentPhraseIndex = 0;
        let score = 0;
        let completedPhrases = 0;
        let timeLeft = 60;
        let timerInterval;
        let gameActive = true;

        // Elementos del DOM
        const phraseElement = document.getElementById('phrase');
        const translationElement = document.getElementById('translation');
        const optionsElement = document.getElementById('options');
        const feedbackElement = document.getElementById('feedback');
        const scoreElement = document.getElementById('score');
        const completedElement = document.getElementById('completed');
        const timerElement = document.getElementById('timer');
        const progressElement = document.getElementById('progress');
        const nextButton = document.getElementById('nextButton');
        const hintButton = document.getElementById('hintButton');
        const gameArea = document.getElementById('gameArea');
        const gameComplete = document.getElementById('gameComplete');
        const finalScoreElement = document.getElementById('finalScore');
        const restartButton = document.getElementById('restartButton');

        // Inicializar el juego
        function initGame() {
            currentPhraseIndex = 0;
            score = 0;
            completedPhrases = 0;
            timeLeft = 60;
            gameActive = true;
            
            scoreElement.textContent = score;
            completedElement.textContent = `${completedPhrases}/${phrases.length}`;
            timerElement.textContent = timeLeft;
            progressElement.style.width = '0%';
            
            gameArea.style.display = 'block';
            gameComplete.style.display = 'none';
            
            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);
            
            loadPhrase();
        }

        // Cargar la frase actual
        function loadPhrase() {
            const currentPhrase = phrases[currentPhraseIndex];
            phraseElement.textContent = currentPhrase.hnahna;
            translationElement.textContent = currentPhrase.translation;
            
            // Limpiar opciones anteriores
            optionsElement.innerHTML = '';
            
            // Mezclar opciones
            const shuffledOptions = [...currentPhrase.options].sort(() => Math.random() - 0.5);
            
            // Crear botones de opciones
            shuffledOptions.forEach(option => {
                const button = document.createElement('div');
                button.className = 'option';
                button.textContent = option;
                button.addEventListener('click', () => selectOption(option, button));
                optionsElement.appendChild(button);
            });
            
            // Reiniciar estado de botones
            nextButton.disabled = true;
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
        }

        // Seleccionar una opción
        function selectOption(selectedOption, buttonElement) {
            if (!gameActive) return;
            
            const currentPhrase = phrases[currentPhraseIndex];
            const isCorrect = selectedOption === currentPhrase.correct;
            
            // Deshabilitar todas las opciones
            const allOptions = document.querySelectorAll('.option');
            allOptions.forEach(option => {
                option.style.pointerEvents = 'none';
            });
            
            // Marcar opción correcta e incorrecta
            allOptions.forEach(option => {
                if (option.textContent === currentPhrase.correct) {
                    option.classList.add('correct');
                } else if (option === buttonElement && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });
            
            // Mostrar retroalimentación
            if (isCorrect) {
                feedbackElement.textContent = '¡Correcto!';
                feedbackElement.classList.add('correct-feedback');
                score += 10;
                completedPhrases++;
                scoreElement.textContent = score;
                completedElement.textContent = `${completedPhrases}/${phrases.length}`;
                progressElement.style.width = `${(completedPhrases / phrases.length) * 100}%`;
            } else {
                feedbackElement.textContent = `Incorrecto. La respuesta correcta es: ${currentPhrase.correct}`;
                feedbackElement.classList.add('incorrect-feedback');
            }
            
            // Habilitar botón siguiente
            nextButton.disabled = false;
            
            // Verificar si el juego ha terminado
            if (completedPhrases === phrases.length) {
                endGame();
            }
        }

        // Siguiente frase
        function nextPhrase() {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            loadPhrase();
        }

        // Proporcionar una pista
        function provideHint() {
            if (!gameActive) return;
            
            const currentPhrase = phrases[currentPhraseIndex];
            const correctOption = document.querySelector(`.option:contains('${currentPhrase.correct}')`);
            
            if (correctOption) {
                // Destacar la opción correcta con una animación
                correctOption.style.boxShadow = '0 0 15px #4CAF50';
                correctOption.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    correctOption.style.boxShadow = '';
                    correctOption.style.transform = '';
                }, 1500);
            }
            
            // Penalizar por usar pista
            score = Math.max(0, score - 2);
            scoreElement.textContent = score;
        }

        // Actualizar temporizador
        function updateTimer() {
            if (!gameActive) return;
            
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }

        // Finalizar juego
        function endGame() {
            gameActive = false;
            clearInterval(timerInterval);
            
            // Mostrar pantalla de finalización
            gameArea.style.display = 'none';
            gameComplete.style.display = 'block';
            finalScoreElement.textContent = score;
        }

        // Inicializar cuando se carga la página
        document.addEventListener('DOMContentLoaded', () => {
            initGame();
            
            // Event listeners para botones
            nextButton.addEventListener('click', nextPhrase);
            hintButton.addEventListener('click', provideHint);
            restartButton.addEventListener('click', initGame);
        });

        // Extensión para seleccionar elementos por contenido de texto
        // (No es estándar, pero útil para este caso)
        jQuery.expr[':'].contains = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
