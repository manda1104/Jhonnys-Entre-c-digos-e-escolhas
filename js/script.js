import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let historiaFinal = "";
let perguntasVisitadas = new Set();

function mostraPergunta() {
  caixaResultado.classList.remove("mostrar");
  caixaAlternativas.replaceChildren();

  const perguntaAtual = perguntas[atual];
  if (!perguntaAtual) {
    mostraResultado();
    return;
  }

  caixaPerguntas.textContent = perguntaAtual.enunciado;

  perguntaAtual.alternativas.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.className = "alternativa-btn";
    botao.type = "button";
    botao.textContent = opcao.texto;
    botao.addEventListener("click", () => respostaSelecionada(opcao));
    caixaAlternativas.appendChild(botao);
  });
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
  historiaFinal += afirmacao + "\n\n";
  perguntasVisitadas.add(atual);

  if (opcaoSelecionada.proxima !== undefined) {
    atual = opcaoSelecionada.proxima;
  } else {
    mostraResultado();
    return;
  }
  mostraPergunta();
}

function mostraResultado() {
  caixaPerguntas.textContent = `Jhonnys concluiu esta etapa da jornada em Ponta Grossa.`;
  caixaAlternativas.replaceChildren();
  textoResultado.textContent =
    historiaFinal +
    `Durante a jornada, ${nome}, colega de Jhonnys, também percebeu que a inteligência artificial pode ajudar muito, mas não substitui o pensamento crítico, a prática, a privacidade e a responsabilidade. Na Engenharia de Software, aprender a fazer boas perguntas e verificar as respostas é tão importante quanto escrever código.`;
  caixaResultado.classList.add("mostrar");
  botaoJogarNovamente.focus();
}

function iniciaJogo() {
  atual = 0;
  historiaFinal = "";
  perguntasVisitadas = new Set();
  telaInicial.classList.add("oculto");
  mostraPergunta();
}

function jogaNovamente() {
  atual = 0;
  historiaFinal = "";
  perguntasVisitadas = new Set();
  caixaResultado.classList.remove("mostrar");
  telaInicial.classList.remove("oculto");
  caixaPerguntas.textContent = "";
  caixaAlternativas.replaceChildren();
}

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

