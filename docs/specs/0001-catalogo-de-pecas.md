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
  (`R$ 000,00`) e um selo de status conforme o campo `status`
  (ver `docs/design/DESIGN.md` §2):
  - `disponivel` → selo "Pronta entrega".
  - `sob-encomenda` → selo **"Sob encomenda — pronta em até 3 dias"**
    (prazo de produção da Flávia, PRD §4; não deixar o termo vago).
  - `vendida` → card esmaecido, selo "Vendida", não clicável para contato
    (ver SPEC-0003 RF-01).
- Peças `tipo: "unica"` podem opcionalmente exibir um selo adicional "Peça
  única" no card, para reforçar que não haverá reposição igual.
- O site **não exibe quantidade em estoque** (ex. "restam 2 unidades"),
  mesmo para peças `modelo-repetivel` — decisão de PRD §4 para simplificar
  a manutenção semanal do catálogo.

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
- [ ] Peça com `status: "vendida"` é visualmente distinta e não oferece CTA
      de contato; peça `sob-encomenda` mostra o selo correto e ainda
      permite contato (SPEC-0003).
- [ ] Clicar em um card sempre abre o detalhe correto (sem mistura de dados
      entre peças).
- [ ] Catálogo vazio (`produtos.json` = `[]`) exibe estado vazio amigável, não
      quebra a página.
