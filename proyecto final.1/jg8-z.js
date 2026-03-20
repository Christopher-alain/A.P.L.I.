// Frases: lista de pares Otomí <-> Español
// ...existing code...
const phrases = [
  {otomi: "Xki hax'ājuā nda naa", es: "Buenos días (saludo normal)"},
  {otomi: "Xki dekjuā", es: "Buenas tardes"},
  {otomi: "Xki hax'ājuā ri teklei", es: "Buenos días (saludo de respeto)"},
  {otomi: "Xki dekjuā ri teklei", es: "Buenas tardes"},
  {otomi: "Xki hax'ājuā ri tekleihu", es: "Buenos días (saludo de respeto plural)"},
  {otomi: "Xki dekjuā ri tekleihu", es: "Buenas tardes"},
  {otomi: "Haxkāhu rā zi Dada", es: "Hasta mañana (plural)"},
  {otomi: "Gā nzenjuahu", es: "Hasta luego"},
];
// ...existing code...

// Estado
let current = null;
let score = 0;
let dir = 'otomi-es';

// Elementos
const phraseEl = document.getElementById('phrase');
const answerEl = document.getElementById('answer');
const checkBtn = document.getElementById('checkBtn');
const nuevoBtn = document.getElementById('nuevoBtn');
const feedbackEl = document.getElementById('feedback');
const revealBtn = document.getElementById('revealBtn');
const scoreEl = document.getElementById('score');
const dirBtn = document.getElementById('dirBtn');
const correctRevealEl = document.getElementById('correctReveal');

function randInt(max){ return Math.floor(Math.random()*max); }
function pickRandom(){ return phrases[randInt(phrases.length)]; }

function normalize(s){
  if(!s) return '';
  return s.toString().toLowerCase()
    .replace(/[’‘`´]/g,"'")
    .replace(/['"]/g," ")
    .replace(/[¿?¡!.,:;()\[\]—––\-]/g,"")
    .normalize('NFD').replace(/[\u0300-\u036f]/g,"")
    .replace(/\s+/g," ").trim();
}

function isMatch(expected, answer){
  expected = normalize(expected);
  answer = normalize(answer);
  if(!answer) return false;
  if(expected === answer) return true;
  const expTokens = expected.split(' ').filter(Boolean);
  const ansTokens = answer.split(' ').filter(Boolean);
  let found = 0;
  for(const t of expTokens){
    if(ansTokens.some(a=> a.includes(t) || t.includes(a))) found++;
  }
  if(expTokens.length===0) return false;
  if(found / expTokens.length >= 0.6) return true;
  if(expTokens.length <= 2 && found>=1) return true;
  return false;
}

// Actualiza solamente la visualización de la frase según la dirección,
// sin elegir una nueva frase.
function updatePhraseDisplay(){
  if(!current) current = pickRandom();
  if(dir==='otomi-es'){
    phraseEl.textContent = current.otomi;
    answerEl.placeholder = "Traduce al Español...";
  } else {
    phraseEl.textContent = current.es;
    answerEl.placeholder = "Traduce al Hñähñu (Otomí)...";
  }
}

function renderPhrase(){
  current = pickRandom();
  answerEl.value = '';
  feedbackEl.style.display='none';
  correctRevealEl.style.display='none';
  updatePhraseDisplay();
  answerEl.focus();
}

function updateScore(){ scoreEl.textContent = `Puntos: ${score}`; }

checkBtn.addEventListener('click',()=>{
  const user = answerEl.value;
  const expected = dir==='otomi-es'? current.es : current.otomi;
  const ok = isMatch(expected, user);
  feedbackEl.style.display='block';
  if(ok){
    score += 1;
    feedbackEl.className='feedback good';
    feedbackEl.textContent = "¡Correcto! +1 punto.";
    correctRevealEl.style.display='none';
    updateScore();
  } else {
    feedbackEl.className='feedback bad';
    feedbackEl.textContent = "No coincide. Intenta de nuevo o muestra la respuesta.";
  }
});

nuevoBtn.addEventListener('click',()=> renderPhrase());
revealBtn.addEventListener('click',()=>{
  const expected = dir==='otomi-es'? current.es : current.otomi;
  correctRevealEl.style.display='block';
  correctRevealEl.textContent = `Respuesta: ${expected}`;
});
dirBtn.addEventListener('click',()=>{
  // Cambia solo la dirección y actualiza la visualización de la frase
  dir = dir==='otomi-es' ? 'es-otomi' : 'otomi-es';
  dirBtn.textContent = dir==='otomi-es' ? 'Otomí → Español' : 'Español → Otomí';
  updatePhraseDisplay(); // mantiene la misma frase aunque se presione varias veces
});

answerEl.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){ e.preventDefault(); checkBtn.click(); }
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // fallback: ajustar la ruta según tu página principal
        window.location.href = 'saludos.html';
      }
    });

    // tecla Escape para volver
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') backBtn.click();
    });
  }
});
// ...existing code...

// iniciar
renderPhrase();
updateScore();