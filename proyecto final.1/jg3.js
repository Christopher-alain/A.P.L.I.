// Datos del juego
const sentences = [
    {
        level: 1,
        sentence_es: "Yo soy un __.",
        sentence_ot: "Nde̱ ya __ dä.",
        options: ["hñä", "xita", "t'o̱gi"],
        answer: "hñä",
        hint: "Significa 'humano' en Otomí"
    },
    {
        level: 1,
        sentence_es: "La casa es __.",
        sentence_ot: "Jä'i ya __.",
        options: ["ki̱mä", "thogi", "mät'i"],
        answer: "ki̱mä",
        hint: "Significa 'bonita' en Otomí"
    },
    {
        level: 2,
        sentence_es: "Me gusta el __.",
        sentence_ot: "Ngi̱hni ya __.",
        options: ["ñä", "ya̱hi", "ts'iki"],
        answer: "ñä",
        hint: "Es un astro brillante"
    },
    {
        level: 2,
        sentence_es: "El __ corre.",
        sentence_ot: "__ mbo̱ni.",
        options: ["xita", "hñä", "ki̱mä"],
        answer: "xita",
        hint: "Es un animal doméstico"
    },
    {
        level: 3,
        sentence_es: "El __ brilla.",
        sentence_ot: "__ mbo̱ni.",
        options: ["ñä", "ya̱hi", "thogi"],
        answer: "ñä",
        hint: "Ilumina durante el día"
    }
];

// Variables del juego
let currentSentenceIndex = 0;
let score = 0;
let currentLevel = 1;
let canAnswer = true;

// Elementos del DOM
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-btn');
const helpButton = document.getElementById('help-btn');

// Inicializar juego
function initializeGame() {
    shuffleSentences();
    updateStats();
    loadSentence();
    setupEventListeners();
}

// Mezclar frases del nivel actual
function shuffleSentences() {
    sentences
        .filter(s => s.level === currentLevel)
        .sort(() => Math.random() - 0.5);
}

// Actualizar estadísticas
function updateStats() {
    scoreElement.textContent = score;
    levelElement.textContent = currentLevel;
}

// Cargar frase actual
function loadSentence() {
    const current = sentences[currentSentenceIndex];
    
    document.getElementById('sentence-es').innerText = current.sentence_es;
    document.getElementById('sentence-ot').innerText = current.sentence_ot;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    // Mezclar opciones
    const shuffledOptions = [...current.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const div = document.createElement('div');
        div.innerText = option;
        div.className = 'option';
        div.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(div);
    });

    resultElement.innerText = '';
    resultElement.className = 'result-message';
    nextButton.disabled = true;
    canAnswer = true;
}

// Verificar respuesta
function checkAnswer(selectedOption) {
    if (!canAnswer) return;
    
    const current = sentences[currentSentenceIndex];
    const isCorrect = selectedOption === current.answer;
    const options = document.getElementsByClassName('option');
    
    canAnswer = false;

    // Marcar todas las opciones
    Array.from(options).forEach(option => {
        if (option.innerText === current.answer) {
            option.classList.add('correct');
        } else if (option.innerText === selectedOption && !isCorrect) {
            option.classList.add('wrong');
        }
    });

    // Mostrar mensaje
    resultElement.innerText = isCorrect ? 
        "¡Correcto! / ¡Majuäni!" : 
        "Intenta de nuevo / Yopi ra yopi";
    resultElement.className = `result-message ${isCorrect ? 'correct' : 'wrong'}`;

    // Actualizar puntuación
    if (isCorrect) {
        score += 10;
        updateStats();
    }

    nextButton.disabled = false;
}

// Pasar a la siguiente frase
function nextSentence() {
    currentSentenceIndex++;
    
    // Verificar si pasar al siguiente nivel
    const currentLevelSentences = sentences.filter(s => s.level === currentLevel);
    const completedCurrentLevel = currentSentenceIndex >= currentLevelSentences.length;
    
    if (completedCurrentLevel && currentLevel < 3) {
        currentLevel++;
        currentSentenceIndex = 0;
        shuffleSentences();
        showLevelMessage();
    } else if (currentSentenceIndex >= sentences.length) {
        showGameComplete();
        return;
    }
    
    loadSentence();
    updateStats();
}

// Mostrar mensaje de nivel completado
function showLevelMessage() {
    resultElement.innerText = `¡Nivel ${currentLevel - 1} completado! / ¡Bi juadi ra nt'eni ${currentLevel - 1}!`;
    resultElement.className = 'result-message correct';
}

// Mostrar mensaje de juego completado
function showGameComplete() {
    const container = document.querySelector('main');
    container.innerHTML = `
        <div class="sentence-box" style="text-align: center">
            <h2>¡Felicidades! / ¡Xadi!</h2>
            <p>Has completado el juego con ${score} puntos</p>
            <button onclick="restartGame()" class="btn">Jugar de nuevo</button>
        </div>
    `;
}

// Reiniciar juego
function restartGame() {
    currentSentenceIndex = 0;
    currentLevel = 1;
    score = 0;
    shuffleSentences();
    updateStats();
    location.reload();
}

// Configurar event listeners
function setupEventListeners() {
    nextButton.addEventListener('click', nextSentence);
    
    helpButton.addEventListener('click', () => {
        const current = sentences[currentSentenceIndex];
        alert(current.hint);
    });
}

// Iniciar juego
initializeGame();
