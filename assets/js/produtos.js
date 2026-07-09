export async function carregarProdutos() {
  const resposta = await fetch("data/produtos.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar data/produtos.json");
  }
  return resposta.json();
}

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function criarCardProduto(produto) {
  const link = document.createElement("a");
  link.className = "card-produto";
  if (produto.destaque) link.classList.add("card-produto--destaque");
  link.href = `#${produto.slug}`;
  link.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);

  const figura = document.createElement("div");
  figura.className = "card-produto__figura";

  const imagem = document.createElement("img");
  imagem.src = produto.imagens[0];
  imagem.alt = produto.nome;
  imagem.loading = "lazy";
  figura.appendChild(imagem);

  link.appendChild(figura);

  const corpo = document.createElement("div");
  corpo.className = "card-produto__corpo";

  const texto = document.createElement("div");
  texto.className = "card-produto__texto";

  const nome = document.createElement("h3");
  nome.className = "card-produto__nome";
  nome.textContent = produto.nome;
  texto.appendChild(nome);

  corpo.appendChild(texto);

  const preco = document.createElement("span");
  preco.className = "tag-preco";
  preco.textContent = formatarPreco(produto.preco);
  corpo.appendChild(preco);

  link.appendChild(corpo);

  return link;
}
