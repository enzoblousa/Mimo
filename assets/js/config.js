export async function carregarConfig() {
  const resposta = await fetch("data/config.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar data/config.json");
  }
  return resposta.json();
}

export function preencherContato(config) {
  document.querySelectorAll("[data-link-whatsapp]").forEach((el) => {
    el.href = `https://wa.me/${config.whatsapp}`;
  });
  document.querySelectorAll("[data-link-instagram]").forEach((el) => {
    el.href = config.instagram;
  });
}

export function preencherIdentidade(config) {
  document.querySelectorAll("[data-nome-loja]").forEach((el) => {
    el.textContent = config.nomeLoja;
  });
  document.querySelectorAll("[data-posicionamento]").forEach((el) => {
    el.textContent = config.posicionamento;
  });
}
