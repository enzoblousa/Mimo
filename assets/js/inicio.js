import { ativarMenuMobile } from "./menu.js";
import { carregarConfig, preencherContato, preencherIdentidade } from "./config.js";
import { carregarProdutos, criarCardProduto } from "./produtos.js";
import { filtrarProdutos } from "./filtro.js";
import { configurarModal } from "./modal.js";

function renderizarGrade(produtos) {
  const grade = document.querySelector("[data-grade-catalogo]");
  const vazio = document.querySelector("[data-catalogo-vazio]");
  grade.innerHTML = "";

  const semResultado = produtos.length === 0;
  vazio.hidden = !semResultado;
  if (semResultado) return;

  produtos.forEach((produto) => grade.appendChild(criarCardProduto(produto)));
}

function configurarBusca(todosProdutos) {
  const campoBusca = document.querySelector("[data-campo-busca]");

  function aplicarBusca() {
    renderizarGrade(filtrarProdutos(todosProdutos, campoBusca.value));
  }

  campoBusca.addEventListener("input", aplicarBusca);

  aplicarBusca();
}

async function iniciar() {
  ativarMenuMobile();

  const config = await carregarConfig();
  document.title = `${config.nomeLoja} — ${config.posicionamento}`;
  preencherIdentidade(config);
  preencherContato(config);

  const produtos = await carregarProdutos();
  configurarBusca(produtos);
  configurarModal(produtos, config);
}

iniciar().catch((erro) => console.error("Falha ao iniciar a página inicial:", erro));
