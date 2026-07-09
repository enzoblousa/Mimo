export const CATEGORIAS = [
  "Para Presentear",
  "Decorativas",
  "Utilitárias",
  "Animais",
  "Porta-copos",
  "Porta-Joias",
];

export function filtrarProdutos(produtos, { categoria = "todas", busca = "" } = {}) {
  const buscaNormalizada = busca.trim().toLowerCase();

  return produtos.filter((produto) => {
    const categoriaOk = categoria === "todas" || produto.categoria === categoria;
    const buscaOk =
      buscaNormalizada === "" ||
      `${produto.nome} ${produto.descricao}`.toLowerCase().includes(buscaNormalizada);
    return categoriaOk && buscaOk;
  });
}
