export function ativarMenuMobile() {
  const botao = document.querySelector("[data-botao-menu]");
  const nav = document.querySelector("[data-nav]");
  if (!botao || !nav) return;

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("nav--aberta");
    botao.setAttribute("aria-expanded", String(aberto));
  });
}
