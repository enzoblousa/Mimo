const MENSAGENS_POR_STATUS = {
  disponivel: (produto) =>
    `Olá! Tenho interesse na peça "${produto.nome}". Ainda está disponível?`,
  "sob-encomenda": (produto) =>
    `Olá! Vi a peça "${produto.nome}" sob encomenda. Como funciona pra encomendar?`,
};

/**
 * Retorna o link wa.me para perguntar sobre uma peça específica, ou `null`
 * se a peça estiver vendida (SPEC-0003 RF-01: peça vendida não tem CTA).
 */
export function linkContatoProduto(produto, config) {
  const gerarMensagem = MENSAGENS_POR_STATUS[produto.status];
  if (!gerarMensagem) return null;
  const mensagem = encodeURIComponent(gerarMensagem(produto));
  return `https://wa.me/${config.whatsapp}?text=${mensagem}`;
}
