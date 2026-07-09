import { ativarMenuMobile } from "./menu.js";
import { carregarConfig, preencherContato, preencherIdentidade } from "./config.js";
import { carregarProdutos, criarCardProduto } from "./produtos.js";
import { CATEGORIAS, filtrarProdutos } from "./filtro.js";
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

function configurarFiltros(todosProdutos) {
  const listaFiltros = document.querySelector("[data-lista-filtros]");
  const campoBusca = document.querySelector("[data-campo-busca]");
  const estado = { categoria: "todas", busca: "" };

  function aplicarFiltros() {
    renderizarGrade(filtrarProdutos(todosProdutos, estado));
  }

  const categorias = ["todas", ...CATEGORIAS];
  categorias.forEach((categoria) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "filtro-item";
    botao.textContent = categoria === "todas" ? "Todas" : categoria;
    botao.setAttribute("aria-pressed", String(categoria === "todas"));

    botao.addEventListener("click", () => {
      estado.categoria = categoria;
      listaFiltros
        .querySelectorAll(".filtro-item")
        .forEach((item) => item.setAttribute("aria-pressed", "false"));
      botao.setAttribute("aria-pressed", "true");
      aplicarFiltros();
    });

    listaFiltros.appendChild(botao);
  });

  campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    aplicarFiltros();
  });

  aplicarFiltros();
}

async function iniciar() {
  ativarMenuMobile();

  const config = await carregarConfig();
  document.title = `${config.nomeLoja} — ${config.posicionamento}`;
  preencherIdentidade(config);
  preencherContato(config);

  const produtos = await carregarProdutos();
  configurarFiltros(produtos);
  configurarModal(produtos, config);
}

iniciar().catch((erro) => console.error("Falha ao iniciar a página inicial:", erro));
