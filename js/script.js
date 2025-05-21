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