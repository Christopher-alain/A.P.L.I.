const questions = [
    { otomi: "Nde", español: "Hola" },
    { otomi: "Bö", español: "Adiós" },
    { otomi: "Xhi", español: "Gracias" },
    { otomi: "Ndi", español: "Por favor" }
];

let currentQuestionIndex = 0;
let correctDirection = "";

const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');

    optionsElement.innerHTML = "";
    resultElement.textContent = "";

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `¿Cómo se dice "${currentQuestion.español}" en otomí?`;

    let shuffled = [...questions].sort(() => Math.random() - 0.5);
    const directions = ["north", "south", "east", "west"];

    shuffled.forEach((q, i) => {
        const button = document.createElement("button");
        button.textContent = q.otomi;
        button.className = "button " + directions[i];

        optionsElement.appendChild(button);

        if (q.otomi === currentQuestion.otomi) {
            correctDirection = directions[i];
        }
    });

    resetPlayer();
}

function resetPlayer() {
    const player = document.getElementById("player");
    player.style.top = "130px";
    player.style.left = "130px";
}

function move(direction) {
    const player = document.getElementById("player");
    const resultElement = document.getElementById("result");

    let short = 70;
    let full = 120;

    if (direction === correctDirection) {
        movePlayer(player, direction, full);

        correctSound.currentTime = 0;
        correctSound.play();

        setTimeout(() => {
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                resultElement.textContent = "¡Correcto!";
                loadQuestion();
            } else {
                resultElement.textContent = "🎉 Felicidades has completado esta etapa";
                document.getElementById('question').textContent = "";
                document.getElementById('options').innerHTML = "";
            }
        }, 500);

    } else {
        movePlayer(player, direction, short);

        incorrectSound.currentTime = 0;
        incorrectSound.play();

        resultElement.textContent = "¡Incorrecto!";
    }
}

function movePlayer(player, direction, dist) {
    let top = 130;
    let left = 130;

    if (direction === "north") top -= dist;
    if (direction === "south") top += dist;
    if (direction === "west") left -= dist;
    if (direction === "east") left += dist;

    player.style.top = top + "px";
    player.style.left = left + "px";
}

// teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") move("north");
    if (e.key === "ArrowDown") move("south");
    if (e.key === "ArrowLeft") move("west");
    if (e.key === "ArrowRight") move("east");
});

// iniciar
window.onload = loadQuestion;