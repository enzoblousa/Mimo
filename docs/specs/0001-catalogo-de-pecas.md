# SPEC-0001: Catálogo de Peças

- Status: Aceito
- ADRs relacionados: [0001](../adr/0001-escopo-vitrine-estatica.md),
  [0003](../adr/0003-dados-produtos-json-local.md)

## Objetivo

Permitir que uma visitante navegue pelas peças de cerâmica disponíveis,
filtre por categoria e veja detalhes suficientes para decidir entrar em
contato.

## Requisitos funcionais

### RF-01: Listagem de peças

- O catálogo exibe todas as peças de `data/produtos.json` como uma grade de
  cards.
- Cada card mostra: foto principal, nome, categoria, preço formatado em BRL
  (`R$ 000,00`) e um indicador se a peça está **disponível** ou **vendida**.
- Peças marcadas como `disponivel: false` aparecem visualmente
  esmaecidas/com selo "Peça única vendida" e não são clicáveis para contato
  (ver SPEC-0003).

### RF-02: Filtro por categoria

- Existe uma barra de filtros com as categorias presentes no catálogo (ex.:
  Vasos, Xícaras, Tigelas, Decoração) calculada dinamicamente a partir dos
  dados — nunca uma lista fixa hardcoded no HTML.
- Um filtro "Todas" mostra o catálogo completo (estado inicial).
- Selecionar uma categoria filtra a grade sem recarregar a página.

### RF-03: Busca textual (opcional, nice-to-have)

- Campo de busca que filtra por nome/descrição da peça, combinável com o
  filtro de categoria.
- Se não houver resultado, exibir mensagem amigável ("Nenhuma peça encontrada
  para sua busca").

### RF-04: Detalhe da peça

- Ao clicar em um card, abre uma visualização de detalhe (modal ou seção
  expandida — decisão de implementação em DESIGN.md) com: todas as fotos da
  peça, descrição completa, dimensões/medidas, técnica (ex. "torno",
  "modelagem manual"), preço e o botão de contato (SPEC-0003).

## Requisitos de dados

- Toda peça exibida deve vir de `data/produtos.json`. Nenhum dado de peça é
  hardcoded em HTML/JS.
- Peças sem imagem válida não devem quebrar a renderização: usar uma imagem
  placeholder e logar aviso no console.

## Critérios de aceite

- [ ] Grade renderiza corretamente com 1, poucas (3-5) e muitas (20+) peças.
- [ ] Filtro de categoria funciona e reflete exatamente as categorias
      existentes nos dados.
- [ ] Peça indisponível é visualmente distinta e não oferece CTA de compra.
- [ ] Clicar em um card sempre abre o detalhe correto (sem mistura de dados
      entre peças).
- [ ] Catálogo vazio (`produtos.json` = `[]`) exibe estado vazio amigável, não
      quebra a página.
