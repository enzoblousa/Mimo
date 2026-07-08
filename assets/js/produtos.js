const ROTULO_STATUS = {
  disponivel: "Pronta entrega",
  "sob-encomenda": "Sob encomenda — pronta em até 3 dias",
  vendida: "Vendida",
};

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
  link.href = `catalogo.html#${produto.slug}`;
  link.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);
  if (produto.status === "vendida") {
    link.classList.add("card-produto--vendida");
  }

  const figura = document.createElement("div");
  figura.className = "card-produto__figura";

  const imagem = document.createElement("img");
  imagem.src = produto.imagens[0];
  imagem.alt = produto.nome;
  imagem.loading = "lazy";
  figura.appendChild(imagem);

  const selo = document.createElement("span");
  selo.className = `selo selo--${produto.status}`;
  selo.textContent = ROTULO_STATUS[produto.status] ?? produto.status;
  figura.appendChild(selo);

  link.appendChild(figura);

  const corpo = document.createElement("div");
  corpo.className = "card-produto__corpo";

  const nome = document.createElement("h3");
  nome.className = "card-produto__nome";
  nome.textContent = produto.nome;
  corpo.appendChild(nome);

  const categoria = document.createElement("p");
  categoria.className = "card-produto__categoria";
  categoria.textContent = produto.categoria;
  corpo.appendChild(categoria);

  const preco = document.createElement("span");
  preco.className = "tag-preco";
  preco.textContent = formatarPreco(produto.preco);
  corpo.appendChild(preco);

  link.appendChild(corpo);

  return link;
}
