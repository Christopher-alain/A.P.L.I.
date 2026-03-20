const data = [
    { esp: "A - a", ind: "aa" },
    { esp: "Ä - ä", ind: "a" },
    { esp: "B - b", ind: "b" },
    { esp: "D - d", ind: "d" },
    { esp: "E - e", ind: "eh" },
    { esp: "Ë - ë", ind: "ae" },
    { esp: "F - f", ind: "f" },
    { esp: "G - g", ind: "g" },
    { esp: "H - h", ind: "h" },
    { esp: "I - i", ind: "i" },
    { esp: "J - j", ind: "j" },
    { esp: "K - k", ind: "k" },
    { esp: "L - l", ind: "l" },
    { esp: "M - m", ind: "eme" },
    { esp: "N - n", ind: "ene" },
    { esp: "Ñ - ñ", ind: "eñe" },
    { esp: "O - o", ind: "o" },
    { esp: "O - o", ind: "oe" },
    { esp: "P - p", ind: "pe" },
    { esp: "R - r", ind: "erre" },
    { esp: "S - s", ind: "ese" },
    { esp: "T - t", ind: "te" },
    { esp: "TH - th", ind: "th" },
    { esp: "TS - ts", ind: "ts" },
    { esp: "U - u", ind: "u" },
    { esp: "U - u", ind: "iu" },
    { esp: "X - x", ind: "x" },
    { esp: "Y - y", ind: "y" },
    { esp: "Z - z", ind: "z" }
];

let grupoActual = 0;
let seleccion = null;
let bloqueado = false;

function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function cargarGrupo() {
    const inicio = grupoActual * 5;
    const grupo = data.slice(inicio, inicio + 5);

    if (grupo.length === 0) {
        document.getElementById("mensaje").innerText = "🎉 Felicidades has completado esta etapa";
        document.getElementById("game").style.display = "none";
        return;
    }

    const letrasDiv = document.getElementById("letters");
    const sonidosDiv = document.getElementById("sounds");

    letrasDiv.innerHTML = "";
    sonidosDiv.innerHTML = "";

    let mezclado = mezclar([...grupo]);

    grupo.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerText = item.esp;

        div.onclick = () => seleccionarIzq(div, item);

        letrasDiv.appendChild(div);
    });

    mezclado.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerText = item.ind;

        div.onclick = () => seleccionarDer(div, item);

        sonidosDiv.appendChild(div);
    });
}

function seleccionarIzq(div, item) {
    if (bloqueado) return;

    limpiarSeleccion();
    seleccion = { div, item };
    div.classList.add("selected");
}

function seleccionarDer(div, item) {
    if (!seleccion || bloqueado) return;

    bloqueado = true;

    if (seleccion.item.ind === item.ind) {
        div.classList.add("correct");
        seleccion.div.classList.add("correct");

        setTimeout(() => {
            div.remove();
            seleccion.div.remove();

            seleccion = null;
            bloqueado = false;

            // 👉 AQUÍ detecta si ya no quedan cartas
            if (document.getElementById("letters").children.length === 0) {
                grupoActual++;

                setTimeout(() => {
                    cargarGrupo();
                }, 500);
            }

        }, 500);

    } else {
        div.classList.add("wrong");
        seleccion.div.classList.add("wrong");

        setTimeout(() => {
            div.classList.remove("wrong");
            seleccion.div.classList.remove("wrong");

            seleccion = null;
            bloqueado = false;
        }, 500);
    }
}

function limpiarSeleccion() {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
}
function salir() {
    window.location.href = "abecedario.html";
}
// INICIAR
cargarGrupo();