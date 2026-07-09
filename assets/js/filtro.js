export function filtrarProdutos(produtos, busca = "") {
  const buscaNormalizada = busca.trim().toLowerCase();
  if (buscaNormalizada === "") return produtos;

  return produtos.filter((produto) =>
    `${produto.nome} ${produto.descricao}`.toLowerCase().includes(buscaNormalizada),
  );
}
