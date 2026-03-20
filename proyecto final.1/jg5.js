        document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const numberNameDisplay = document.getElementById('number-name-display');
            const answerInput = document.getElementById('answer');
            const submitBtn = document.getElementById('submit-btn');
            const nextBtn = document.getElementById('next-btn');
            const feedback = document.getElementById('feedback');
            const scoreElement = document.getElementById('score');
            const correctCountElement = document.getElementById('correct-count');
            const totalCountElement = document.getElementById('total-count');
            const progressBar = document.getElementById('progress');
            const difficultySelector = document.getElementById('difficulty');
            
            // Variables del juego
            let currentNumber = 0;
            let score = 0;
            let correctAnswers = 0;
            let totalQuestions = 0;
            let currentDifficulty = 'easy';
            
            // Diccionario de números a palabras
            const numberNames = {
                1: "n'aa", 2: "yoho", 3: "hñuu", 4: "goho", 5: "kut'a",
                6: "rato", 7: "yoto", 8: "hñato", 9: "guto", 10: "ret'a",
                11: "ret'a ma n'aa", 12: "ret'a ma yoho", 13: "ret'a ma hñuu", 14: "ret'a ma goho", 15: "ret'a ma kut'a",
                16: "ret'a ma rato", 17: "ret'a ma yoto", 18: "ret'a ma hñato", 19: "ret'a ma guto", 20: "n'ate",
                21: "n'ate ma n'aa", 22: "n'ate ma yoho", 23: "n'ate ma hñuu", 24: "n'ate ma goho", 25: "n'ate ma kut'a",
                26: "n'ate ma rato", 27: "n'ate ma yoto", 28: "n'ate ma hñato", 29: "n'ate ma guto", 30: "n'ate ma ret'a",
                31: "n'ate ne 'ret'a ma n'aa", 32: "n'ate ne 'ret'a ma yoho", 33: "n'ate ne 'ret'a ma hñuu", 34: "n'ate ne 'ret'a ma goho", 35: "n'ate ne 'ret'a ma kut'a",
                36: "n'ate ne 'ret'a ma 'rato", 37: "n'ate ne 'ret'a ma yoto", 38: "n'ate ne 'ret'a ma hñato", 39: "n'ate ne 'ret'a ma guto", 40: "yon'ate",
                56: "n'ate ma 'ret'a ma n'aa", 57: "n'ate ma 'ret'a ma yoho", 58: "n'ate ma 'ret'a ma hñuu", 59: "n'ate ma 'ret'a ma goho", 60: "n'ate ma 'ret'a ma kut'a",
                61: "n'ate ma 'ret'a ma 'rato", 62: "n'ate ma 'ret'a ma yoto", 63: "n'ate ma 'ret'a ma hñato", 64: "n'ate ma 'ret'a ma guto", 65: "n'ate ma 'ret'a ma 'ret'a",
                66: "n'ate ma 'ret'a ma 'rato", 67: "n'ate ma 'ret'a ma yoto", 68: "n'ate ma 'ret'a ma hñato", 69: "n'ate ma 'ret'a ma guto", 70: "n'ate ma 'ret'a ma yon'ate",
                71: "n'ate ma 'ret'a ma 'rato", 72: "n'ate ma 'ret'a ma yoto", 73: "n'ate ma 'ret'a ma hñato", 74: "n'ate ma 'ret'a ma guto", 75: "n'ate ma 'ret'a ma 'ret'a",
                76: "n'ate ma 'ret'a ma 'rato", 77: "n'ate ma 'ret'a ma yoto", 78: "n'ate ma 'ret'a ma hñato", 79: "n'ate ma 'ret'a ma guto", 80: "n'ate ma 'ret'a ma yon'ate",
                81: "n'ate ma 'ret'a ma 'rato", 82: "n'ate ma 'ret'a ma yoto", 83: "n'ate ma 'ret'a ma hñato", 84: "n'ate ma 'ret'a ma guto", 85: "n'ate ma 'ret'a ma 'ret'a",
                86: "n'ate ma 'ret'a ma 'rato", 87: "n'ate ma 'ret'a ma yoto", 88: "n'ate ma 'ret'a ma hñato", 89: "n'ate ma 'ret'a ma guto", 90: "n'ate ma 'ret'a ma yon'ate",
                91: "n'ate ma 'ret'a ma 'rato", 92: "n'ate ma 'ret'a ma yoto", 93: "n'ate ma 'ret'a ma hñato", 94: "n'ate ma 'ret'a ma guto", 95: "n'ate ma 'ret'a ma 'ret'a",
                96: "n'ate ma 'ret'a ma 'rato", 97: "n'ate ma 'ret'a ma yoto", 98: "n'ate ma 'ret'a ma hñato", 99: "n'ate ma 'ret'a ma guto", 100: "n'ate ma 'ret'a ma yon'ate"
            };
            
            // Inicializar el juego
            function initGame() {
                generateQuestion();
                updateStats();
                
                // Event listeners
                submitBtn.addEventListener('click', checkAnswer);
                nextBtn.addEventListener('click', generateQuestion);
                difficultySelector.addEventListener('change', function() {
                    currentDifficulty = this.value;
                    generateQuestion();
                });
                
                answerInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        if (nextBtn.style.display === 'none') {
                            checkAnswer();
                        } else {
                            generateQuestion();
                        }
                    }
                });
            }
            
            // Generar una nueva pregunta
            function generateQuestion() {
                // Determinar rango según dificultad
                let min, max;
                switch(currentDifficulty) {
                    case 'easy':
                        min = 1;
                        max = 20;
                        break;
                    case 'medium':
                        min = 1;
                        max = 50;
                        break;
                    case 'hard':
                        min = 1;
                        max = 100;
                        break;
                }
                
                // Generar número aleatorio
                currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                
                // Mostrar el nombre del número
                numberNameDisplay.textContent = numberNames[currentNumber];
                
                // Limpiar entrada y feedback
                answerInput.value = '';
                feedback.textContent = '';
                feedback.className = 'feedback';
                
                // Ocultar botón siguiente y mostrar botón comprobar
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
                
                // Enfocar en el campo de entrada
                answerInput.focus();
            }
            
            // Comprobar la respuesta
            function checkAnswer() {
                const userAnswer = parseInt(answerInput.value);
                
                if (isNaN(userAnswer)) {
                    feedback.textContent = 'Por favor, escribe un número válido.';
                    feedback.className = 'feedback incorrect';
                    return;
                }
                
                totalQuestions++;
                
                if (userAnswer === currentNumber) {
                    // Respuesta correcta
                    feedback.textContent = '¡Correcto! ¡Bien hecho!';
                    feedback.className = 'feedback correct';
                    score += 10;
                    correctAnswers++;
                } else {
                    // Respuesta incorrecta
                    feedback.textContent = `Incorrecto. La respuesta correcta es: ${currentNumber}. ¡Sigue practicando!`;
                    feedback.className = 'feedback incorrect';
                }
                
                updateStats();
                
                // Mostrar botón siguiente
                nextBtn.style.display = 'inline-block';
                submitBtn.style.display = 'none';
            }
            
            // Actualizar estadísticas
            function updateStats() {
                scoreElement.textContent = score;
                correctCountElement.textContent = correctAnswers;
                totalCountElement.textContent = totalQuestions;
                
                // Actualizar barra de progreso
                const progressPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
                progressBar.style.width = `${progressPercentage}%`;
            }
            
            // Iniciar el juego
            initGame();
        });