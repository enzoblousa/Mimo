import { formatarPreco } from "./produtos.js";
import { linkContatoProduto } from "./contato.js";

function preencherGaleria(dialog, produto) {
  const imagemPrincipal = dialog.querySelector("[data-modal-imagem-principal]");
  const galeria = dialog.querySelector("[data-modal-galeria]");

  imagemPrincipal.src = produto.imagens[0];
  imagemPrincipal.alt = produto.nome;

  galeria.innerHTML = "";
  galeria.hidden = produto.imagens.length <= 1;

  produto.imagens.forEach((src, indice) => {
    const miniatura = document.createElement("button");
    miniatura.type = "button";
    miniatura.className = "modal-produto__miniatura";
    miniatura.setAttribute("aria-label", `Ver foto ${indice + 1} de ${produto.nome}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    miniatura.appendChild(img);

    miniatura.addEventListener("click", () => {
      imagemPrincipal.src = src;
    });

    galeria.appendChild(miniatura);
  });
}

function preencherLinhaOpcional(dialog, seletor, valor) {
  const linha = dialog.querySelector(seletor);
  if (!linha) return;
  if (!valor) {
    linha.hidden = true;
    return;
  }
  linha.hidden = false;
  linha.querySelector("[data-valor]").textContent = valor;
}

function preencherContato(dialog, config) {
  const botaoContato = dialog.querySelector("[data-modal-contato]");
  botaoContato.href = linkContatoProduto(config);
}

function abrirModal(dialog, produto, config) {
  preencherGaleria(dialog, produto);
  dialog.querySelector("[data-modal-nome]").textContent = produto.nome;
  dialog.querySelector("[data-modal-categoria]").textContent = produto.categoria;
  dialog.querySelector("[data-modal-descricao]").textContent = produto.descricao;
  dialog.querySelector("[data-modal-preco]").textContent = formatarPreco(produto.preco);

  preencherLinhaOpcional(dialog, "[data-modal-linha-medidas]", produto.medidas);
  preencherLinhaOpcional(dialog, "[data-modal-linha-tecnica]", produto.tecnica);
  preencherContato(dialog, config);

  if (!dialog.open) dialog.showModal();
}

export function configurarModal(produtos, config) {
  const dialog = document.querySelector("[data-modal-produto]");
  if (!dialog) return;

  const limparHash = () => {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  };

  dialog.querySelector("[data-modal-fechar]").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (evento) => {
    if (evento.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", limparHash);

  const abrirPorHash = () => {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (!slug) return;
    const produto = produtos.find((item) => item.slug === slug);
    if (produto) abrirModal(dialog, produto, config);
  };

  window.addEventListener("hashchange", abrirPorHash);
  abrirPorHash();
}
