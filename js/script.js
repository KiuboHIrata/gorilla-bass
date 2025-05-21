let vidaGorila = 100;
let humanos = Array.from({ length: 100 }, (_, i) => ({ id: i, alive: true }));
let ataqueInterval;

function init() {
  carregarEstado();
  renderizarHumanos();
  atualizarInterface();

  document.getElementById("btn-attack").addEventListener("click", atacar);
  document.getElementById("btn-defend").addEventListener("click", defender);
  document.getElementById("btn-heal").addEventListener("click", curar);
  document.getElementById("btn-restart").addEventListener("click", reiniciarJogo);

  ataqueInterval = setInterval(ataqueHumano, 5000);
}
function executarAcao(callback, mensagem) {
  callback();
  log(mensagem);
  atualizarInterface();
  salvarEstado();
  checarFimDeJogo();
}

function atacar() {
  executarAcao(() => {
    const alvos = humanos.filter(h => h.alive).slice(0, 5);
    alvos.forEach(h => {
      h.alive = false;
      document.getElementById(`human-${h.id}`).classList.add("dead");
    });
  }, '🦍 O gorila atacou e derrotou 5 humanos!');
}
function defender() {
  executarAcao(() => {
    vidaGorila = Math.min(100, vidaGorila + 5);
  }, '🛡️ O gorila se defendeu e recuperou energia.');
}

function curar() {
  executarAcao(() => {
    vidaGorila = Math.min(100, vidaGorila + 10);
  }, '❤️ O gorila se curou.');
}

function ataqueHumano() {
  const vivos = humanos.filter(h => h.alive).length;
  if (vivos > 0) {
    const dano = Math.floor(Math.random() * 5) + 1;
    vidaGorila -= dano;
    vidaGorila = Math.max(0, vidaGorila);
    log(`🗡️ Os humanos atacaram e causaram ${dano} de dano ao gorila.`);
    atualizarInterface();
    salvarEstado();
    checarFimDeJogo();
  }
}

function atualizarInterface() {
  document.getElementById("vida-gorila").textContent = vidaGorila;
  document.getElementById("humanos-restantes").textContent = humanos.filter(h => h.alive).length;
  document.getElementById("health-fill").style.width = `${vidaGorila}%`;
}

function log(msg) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = msg;
  logDiv.appendChild(p);
  if (logDiv.children.length > 50) {
    logDiv.removeChild(logDiv.firstChild);
  }
  logDiv.scrollTop = logDiv.scrollHeight;
}

function renderizarHumanos() {
  const container = document.getElementById("human-list");
  container.innerHTML = "";
  humanos.forEach(h => {
    const div = document.createElement("div");
    div.className = "human" + (h.alive ? "" : " dead");
    div.id = `human-${h.id}`;
    container.appendChild(div);
  });
}

function salvarEstado() {
  localStorage.setItem("vidaGorila", vidaGorila);
  localStorage.setItem("humanos", JSON.stringify(humanos));
}

function carregarEstado() {
  const vg = localStorage.getItem("vidaGorila");
  const h = localStorage.getItem("humanos");
  if (vg && h) {
    vidaGorila = parseInt(vg);
    humanos = JSON.parse(h);
  }
}

function checarFimDeJogo() {
  const vivos = humanos.filter(h => h.alive).length;
  if (vidaGorila <= 0 || vivos === 0) {
    clearInterval(ataqueInterval);
    document.querySelectorAll('.actions button').forEach(btn => btn.disabled = true);
    document.getElementById("resultado-final").textContent =
      vidaGorila <= 0 ? "💀 O gorila foi derrotado!" : "🎉 Todos os humanos foram derrotados!";
    document.getElementById("end-screen").classList.remove("hidden");
  }
}