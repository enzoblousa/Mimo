# SPEC-0001: Catálogo de Peças

- Status: Aceito
- ADRs relacionados: [0001](../adr/0001-escopo-vitrine-estatica.md),
  [0003](../adr/0003-dados-produtos-json-local.md)

## Objetivo

Permitir que uma visitante navegue pelas peças de cerâmica disponíveis e
veja detalhes suficientes para decidir entrar em contato.

## Requisitos funcionais

### RF-01: Listagem de peças

- O catálogo exibe todas as peças de `data/produtos.json` como uma grade de
  cards.
- Cada card mostra: foto principal, nome e preço formatado em BRL
  (`R$ 000,00`).
- **Removido (2026-07-08, decisão do usuário; campo removido do schema em
  2026-07-09)**: o card e o modal de detalhe não mostram nenhum rótulo/selo
  de estado comercial — nem esmaecimento visual de peça vendida. Toda peça
  aparece visualmente igual. O campo `status`
  (`disponivel`/`sob-encomenda`/`vendida`) que existia em
  `data/produtos.json` (ADR-0003, `docs/design/DESIGN.md` §2) foi removido
  do schema por completo em 2026-07-09 — não existe mais no dado nem na
  validação. Ver também SPEC-0003 RF-01 (CTA de contato não varia por
  estado comercial).
- O site **não exibe quantidade em estoque** (ex. "restam 2 unidades"),
  mesmo para peças `modelo-repetivel` — decisão de PRD §4 para simplificar
  a manutenção semanal do catálogo.

### RF-02: Categorias — **reintroduzido (2026-07-09, decisão do usuário)**

- O catálogo tem um filtro por categoria: barra de botões
  (`.filtros__lista`) com 6 categorias fixas (`CATEGORIAS` em
  `assets/js/filtro.js`) mais a opção "Todas" (padrão, mostra tudo).
  Diferente da implementação original (removida em 2026-07-09, ver
  histórico abaixo), a lista de categorias **não é mais calculada
  dinamicamente** a partir de `produtos.json` — é um enum fixo, então uma
  categoria sem nenhuma peça ainda aparece no filtro (só retorna
  resultado vazio até existir peça nela).
- Categorias válidas: **Decorativas, Utilitárias, Animais, Porta-copos,
  Porta-Joias, Para Presentear** (`docs/design/DESIGN.md` §2, validado em
  `scripts/validar-produtos.js`).
- Cada peça tem exatamente uma categoria (`categoria`, string obrigatória,
  um dos 6 valores acima), exibida no card (`.card-produto__categoria`) e
  no modal (`.modal-produto__categoria`).
- Filtro por categoria e busca textual (RF-03) combinam com **E** lógico:
  aplicar os dois reduz o resultado pela interseção.

> **Histórico**: entre 2026-07-08 (introdução) e 2026-07-09 o catálogo
> teve um filtro por categoria calculado dinamicamente a partir dos dados
> (sem enum fixo). Foi removido por completo em 2026-07-09 e reintroduzido
> no mesmo dia com um enum fixo de 5 categorias — decisões do usuário.
> "Para Presentear" foi adicionada como 6ª categoria pouco depois, mesmo
> dia.

### RF-03: Busca textual (opcional, nice-to-have)

- Campo de busca que filtra por nome/descrição da peça.
- Se não houver resultado, exibir mensagem amigável ("Nenhuma peça encontrada
  para sua busca").

### RF-04: Detalhe da peça

- Ao clicar em um card, abre uma visualização de detalhe (modal ou seção
  expandida — decisão de implementação em DESIGN.md) com: todas as fotos da
  peça, descrição completa, dimensões/medidas, preço e o botão de contato
  (SPEC-0003).
- **Removido (2026-07-09, decisão do usuário)**: o detalhe da peça não
  mostra mais um campo de técnica (ex. "torno", "modelagem manual") — como
  toda peça da Mimmo é feita à mão, o campo não distinguia nada de fato.
  `data/produtos.json` e `scripts/validar-produtos.js` não conhecem mais
  `tecnica` (`docs/design/DESIGN.md` §2).

## Requisitos de dados

- Toda peça exibida deve vir de `data/produtos.json`. Nenhum dado de peça é
  hardcoded em HTML/JS.
- Peças sem imagem válida não devem quebrar a renderização: usar uma imagem
  placeholder e logar aviso no console.

## Critérios de aceite

- [ ] Grade renderiza corretamente com 1, poucas (3-5) e muitas (20+) peças.
- [x] Filtro de categoria funciona: cada uma das 6 categorias fixas filtra
      corretamente as peças correspondentes; "Todas" mostra o catálogo
      completo; categoria sem peça ainda mostra estado vazio amigável em
      vez de quebrar (RF-02, reintroduzido em 2026-07-09).
- [x] ~~Peça com `status: "vendida"` é visualmente distinta e não oferece
      CTA de contato; peça `sob-encomenda` mostra o selo correto e ainda
      permite contato.~~ Removido (2026-07-08); campo `status` removido do
      schema em 2026-07-09 — toda peça é visualmente igual e sempre tem
      CTA de contato (SPEC-0003 RF-01).
- [ ] Clicar em um card sempre abre o detalhe correto (sem mistura de dados
      entre peças).
- [ ] Catálogo vazio (`produtos.json` = `[]`) exibe estado vazio amigável, não
      quebra a página.
