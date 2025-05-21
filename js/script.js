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