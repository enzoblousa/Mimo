import { carregarConfig, preencherContato, preencherIdentidade } from "./config.js";
import { carregarProdutos, criarCardProduto } from "./produtos.js";

function ativarMenuMobile() {
  const botao = document.querySelector("[data-botao-menu]");
  const nav = document.querySelector("[data-nav]");
  if (!botao || !nav) return;

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("nav--aberta");
    botao.setAttribute("aria-expanded", String(aberto));
  });
}

function preencherSobre(config) {
  const container = document.querySelector("[data-sobre]");
  if (!container) return;
  container.innerHTML = "";
  config.sobre
    .split("\n\n")
    .filter((paragrafo) => paragrafo.trim().length > 0)
    .forEach((paragrafo) => {
      const p = document.createElement("p");
      p.textContent = paragrafo;
      container.appendChild(p);
    });
}

async function renderizarDestaques() {
  const secao = document.querySelector("[data-secao-destaques]");
  const grade = document.querySelector("[data-grade-destaques]");
  if (!secao || !grade) return;

  const produtos = await carregarProdutos();
  const destaques = produtos.filter((produto) => produto.destaque);

  secao.hidden = destaques.length === 0;
  if (destaques.length === 0) return;

  destaques.forEach((produto) => grade.appendChild(criarCardProduto(produto)));
}

async function iniciar() {
  ativarMenuMobile();

  const config = await carregarConfig();
  document.title = `${config.nomeLoja} — ${config.posicionamento}`;
  preencherIdentidade(config);
  preencherContato(config);
  preencherSobre(config);

  await renderizarDestaques();
}

iniciar().catch((erro) => console.error("Falha ao iniciar a página inicial:", erro));
