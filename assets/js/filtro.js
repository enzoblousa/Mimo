export function categoriasUnicas(produtos) {
  return [...new Set(produtos.map((produto) => produto.categoria))];
}

export function filtrarProdutos(produtos, { categoria, busca } = {}) {
  const buscaNormalizada = (busca ?? "").trim().toLowerCase();

  return produtos.filter((produto) => {
    const categoriaOk = !categoria || categoria === "todas" || produto.categoria === categoria;
    const buscaOk =
      buscaNormalizada === "" ||
      `${produto.nome} ${produto.descricao}`.toLowerCase().includes(buscaNormalizada);
    return categoriaOk && buscaOk;
  });
}
