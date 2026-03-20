// Palabras en Otomí y Español
const words = [
    { otomí: "Nok", español: "Agua" },
    { otomí: "T'e", español: "Fuego" },
    { otomí: "Hñä", español: "Tierra" },
    { otomí: "Kä", español: "Aire" },
    { otomí: "Pa", español: "Luna" },
    { otomí: "Hyadi", español: "Sol" },
    { otomí: "Dehe", español: "Río" },
    { otomí: "Ndähi", español: "Viento" }
];

// Variables del juego
let pairs = [];
let shuffledPairs = [];
let firstCard = null;
let secondCard = null;
let canFlip = true;
let matches = 0;
let attempts = 0;
let gameTimer = null;
let seconds = 0;

// Inicialización
function initializeGame() {
    // Crear pares de cartas
    pairs = [];
    words.forEach(word => {
        pairs.push({ text: word.español, type: 'es', español: word.español });
        pairs.push({ text: word.otomí, type: 'ot', español: word.español });
    });
    
    // Mezclar cartas
    shuffledPairs = pairs.sort(() => Math.random() - 0.5);
    
    // Resetear variables
    matches = 0;
    attempts = 0;
    seconds = 0;
    updateStats();
    
    // Limpiar y crear tablero
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffledPairs.forEach(pair => gameBoard.appendChild(createCard(pair)));
    
    // Iniciar temporizador
    if (gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(updateTimer, 1000);
}

// Crear carta
function createCard(pair) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.textContent = '?';
    
    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.textContent = pair.text;
    
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', () => flipCard(card, pair));
    return card;
}

// Voltear carta
function flipCard(card, pair) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = { card, pair };
        return;
    }
    
    secondCard = { card, pair };
    canFlip = false;
    attempts++;
    updateStats();
    setTimeout(checkMatch, 1000);
}

// Verificar coincidencia
function checkMatch() {
    const message = document.getElementById('message');
    
    if (
        firstCard.pair.español === secondCard.pair.español &&
        firstCard.pair.type !== secondCard.pair.type
    ) {
        firstCard.card.classList.add('matched');
        secondCard.card.classList.add('matched');
        matches++;
        message.textContent = "¡Correcto! / ¡Majuäni!";
        
        if (matches === words.length) {
            message.textContent = "¡Felicidades! Has completado el juego / ¡Xadi! Ga juadi ra nt'eni";
            clearInterval(gameTimer);
        }
    } else {
        firstCard.card.classList.remove('flipped');
        secondCard.card.classList.remove('flipped');
        message.textContent = "Intenta de nuevo / Yopi ra yopi";
    }
    
    firstCard = null;
    secondCard = null;
    canFlip = true;
    updateStats();
}

// Actualizar estadísticas
function updateStats() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('matches').textContent = matches;
}

// Actualizar temporizador
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = 
        `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Event Listeners
document.getElementById('restart-btn').addEventListener('click', initializeGame);
document.getElementById('help-btn').addEventListener('click', () => {
    alert('Encuentra los pares de palabras que significan lo mismo en Otomí y Español. / Da thoni ya hmuntsi ya hnei ge ra ñäni ra ñätho ne ra ñästhä.');
});

// Iniciar juego
initializeGame();
