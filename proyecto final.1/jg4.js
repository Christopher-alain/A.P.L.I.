document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const numberDisplay = document.getElementById('number-display');
            const answerInput = document.getElementById('answer');
            const submitBtn = document.getElementById('submit-btn');
            const nextBtn = document.getElementById('next-btn');
            const feedback = document.getElementById('feedback');
            const scoreElement = document.getElementById('score');
            const correctCountElement = document.getElementById('correct-count');
            const totalCountElement = document.getElementById('total-count');
            const progressBar = document.getElementById('progress');
            
            // Variables del juego
            let currentNumber = 0;
            let score = 0;
            let correctAnswers = 0;
            let totalQuestions = 0;
            
            // Diccionario de números a palabras
// ...existing code...
            // Diccionario de números a palabras
            const numberNames = {
                1: "n'aa", 2: "Yoho", 3: "Hñuu", 4: "Goho", 5: "kut'a",
                6: "'rato", 7: "yoto", 8: "hñato", 9: "guto", 10: "'ret'a",
                11: "'ret'a ma n'aa", 12: "'ret'a ma yoho", 13: "'ret'a ma hñuu", 14: "'ret'a ma goho", 15: "'ret'a ma kut'a",
                16: "'ret'a ma 'rato", 17: "'ret'a ma yoto", 18: "'ret'a ma hñato", 19: "'ret'a ma guto", 20: "n'ate",
                21: "n'ate ma n'aa", 22: "n'ate ma yoho", 23: "n'ate ma hñuu", 24: "n'ate ma goho", 25: "n'ate ma kut'a",
                26: "n'ate ma 'rato", 27: "n'ate ma yoto", 28: "n'ate ma hñato", 29: "n'ate ma guto", 30: "n'ate ma 'ret'a",
                31: "n'ate ne 'ret'a ma n'aa", 32: "n'ate ne'ret'a ma yoho", 33: "n'ate ne 'ret'a ma hñuu", 34: "n'ate ne 'ret'a ma goho", 35: "n'ate ne'ret'a ma kut'a",
                36: "n'ate ne 'ret'a ma 'rato", 37: "n'ate ne 'ret'a ma yoto", 38: "n'ate ne 'ret'a ma hñato", 39: "n'ate ne 'ret'a ma guto", 40: "yon'ate",
                41: "yon'ate ma n'aa", 42: "yon'ate ma yoho", 43: "yon'ate ma hñuu", 44: "yon'ate ma goho", 45: "yon'ate ma kut'a",
                46: "yon'ate ma 'rato", 47: "yon'ate ma yoto", 48: "yon'ate ma hñato", 49: "yon'ate ma guto", 50: "yon'ate ma 'ret'a",
                51: "yon'ate ne 'ret'a ma n'aa", 52: "yon'ate ne'ret'a ma yoho", 53: "yon'ate ne 'ret'a ma hñuu", 54: "yon'ate ne 'ret'a ma goho", 55: "yon'ate ne'ret'a ma kut'a",
                56: "yon'ate ne 'ret'a ma 'rato", 57: "yon'ate ne 'ret'a ma yoto", 58: "yon'ate ne 'ret'a ma hñato", 59: "yon'ate ne 'ret'a ma guto", 60: "hñun'ate",
                61: "hñu n'ate ma n'aa", 62: "hñu n'ate ma yoho", 63: "hñu n'ate ma hñuu", 64: "hñu n'ate ma goho", 65: "hñu n'ate ma kut'a",
                66: "hñu n'ate ma 'rato", 67: "hñu n'ate ma yoto", 68: "hñu n'ate ma hñato", 69: "hñu n'ate ma guto", 70: "hñu n'ate ma 'ret'a",
                71: "hñu n'ate ne 'ret'a ma n'aa", 72: "hñu n'ate ne'ret'a ma yoho", 73: "hñu n'ate ne 'ret'a ma hñuu", 74: "hñu n'ate ne 'ret'a ma goho", 75: "hñu n'ate ne'ret'a ma kut'a",
                76: "hñu n'ate ne 'ret'a ma 'rato", 77: "hñu n'ate ne 'ret'a ma yoto", 78: "hñu n'ate ne 'ret'a ma hñato", 79: "hñu n'ate ne 'ret'a ma guto", 80: "Gohon'ate",
                81: "goho n'ate ma n'aa", 82: "goho n'ate ma yoho", 83: "goho n'ate ma hñuu", 84: "goho n'ate ma goho", 85: "goho n'ate ma kut'a",
                86: "goho n'ate ma 'rato", 87: "goho n'ate ma yoto", 88: "goho n'ate ma hñato", 89: "goho n'ate ma guto", 90: "goho n'ate ma 'ret'a",
                91: "goho n'ate ne 'ret'a ma n'aa", 92: "goho n'ate ne'ret'a ma yoho", 93: "goho n'ate ne 'ret'a ma hñuu", 94: "goho n'ate ne 'ret'a ma goho", 95: "goho n'ate ne'ret'a ma kut'a",
                96: "goho n'ate ne 'ret'a ma 'rato", 97: "goho n'ate ne 'ret'a ma yoto", 98: "goho n'ate ne 'ret'a ma hñato", 99: "goho n'ate ne 'ret'a ma guto", 100: "n'a nthebe"
            };
// ...existing code...
            
            // Inicializar el juego
            function initGame() {
                generateQuestion();
                updateStats();
                
                // Event listeners
                submitBtn.addEventListener('click', checkAnswer);
                nextBtn.addEventListener('click', generateQuestion);
                
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
                // Generar número aleatorio entre 1 y 100
                currentNumber = Math.floor(Math.random() * 100) + 1;
                
                // Mostrar el número
                numberDisplay.textContent = currentNumber;
                
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
                const userAnswer = answerInput.value.trim().toLowerCase();
                
                if (userAnswer === '') {
                    feedback.textContent = 'Por favor, escribe el nombre del número.';
                    feedback.className = 'feedback incorrect';
                    return;
                }
                
                totalQuestions++;
                
                // Obtener la respuesta correcta
                const correctAnswer = numberNames[currentNumber];
                
                if (userAnswer === correctAnswer) {
                    // Respuesta correcta
                    feedback.textContent = '¡Correcto! ¡Bien hecho!';
                    feedback.className = 'feedback correct';
                    score += 10;
                    correctAnswers++;
                } else {
                    // Respuesta incorrecta
                    feedback.textContent = `Incorrecto. La respuesta correcta es: "${correctAnswer}". ¡Sigue practicando!`;
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