# SPEC-0002: Página Inicial

- Status: Aceito
- ADRs relacionados: [0001](../adr/0001-escopo-vitrine-estatica.md)

## Objetivo

Apresentar a marca Mimmo, transmitir a identidade artesanal/handmade e
mostrar o catálogo completo de peças (SPEC-0001) na mesma página — **desde
2026-07-08 não existe mais uma página de catálogo separada**: o catálogo
(filtro, busca, grade, modal) mora em `index.html` (decisão do usuário, ver
`docs/superpowers/specs/2026-07-08-redesign-visual-delicado-design.md` para
o contexto do redesign que motivou a mudança). O site tem, ao todo, **duas
páginas**: `index.html` (hero + catálogo) e `sobre.html` (RF-02), ligadas
pela navegação do header.

## Requisitos funcionais

### RF-01: Hero

- Seção de abertura com nome da loja ("Mimmo"), uma frase de posicionamento
  (ex. "Cerâmica feita à mão, peça por peça") e uma imagem/foto de destaque.
- CTA "Ver catálogo" (âncora `#catalogo`, mesma página). O CTA "Conhecer a
  Flávia" (link para `sobre.html`) foi removido do hero em 2026-07-09
  (decisão do usuário) — o caminho para `sobre.html` continua existindo via
  link "Sobre" do header (RF-03).

### RF-02: Sobre a loja — **página separada `sobre.html`** (2026-07-09)

- O texto "sobre" (lido de `config.sobre` em `data/config.json`, sem
  hardcode em HTML) vive em `sobre.html`, não na página inicial. A home
  (`index.html`) foca em mostrar as peças (inspiração: ateliedasah.com);
  quem quer conhecer a Flávia/a história da marca navega para `sobre.html`
  pelo link "Sobre" do header (RF-03). O hero deixou de ter um CTA próprio
  para isso em 2026-07-09 (ver RF-01).
- **Histórico**: entre 2026-07-08 e 2026-07-09 esta seção esteve
  documentada como "removida da página inicial", mas por engano nunca
  chegou a sair de fato de `index.html` — ela só foi de fato movida para
  `sobre.html` em 2026-07-09 (ver TASKS.md, Fase 4.11).

### RF-03: Navegação

- Header fixo ou no topo, presente em `index.html` e `sobre.html`, com:
  logo/nome (link para `index.html`), link para "Sobre" (`sobre.html`),
  link para "Catálogo" (`#catalogo` em `index.html` — em `sobre.html` isso
  é `index.html#catalogo`), e link de contato (Instagram — único canal
  desde 2026-07-09, ver ADR-0004).
- Em mobile, navegação colapsa em menu hambúrguer (ver SPEC-0004),
  compartilhado entre as duas páginas via `assets/js/menu.js`.

### RF-04: Destaques — **removido (2026-07-08)**

> Seção "Peças em destaque" (amostra antes do catálogo completo) ficou
> redundante quando o catálogo inteiro passou a morar na home logo abaixo
> do hero — decisão do usuário. `produtos.json` mantém o campo `destaque`
> (não é usado por enquanto).

## Critérios de aceite

- [x] CTA "Ver catálogo" leva à seção do catálogo completo (âncora
      `#catalogo`, mesma página) — RF-01.
- [x] Link "Sobre" do header leva a `sobre.html`, que exibe o texto lido de
      `data/config.json`, editável sem tocar em HTML/CSS — RF-02. (CTA
      "Conhecer a Flávia" do hero removido em 2026-07-09 — ver RF-01.)
- [ ] Header funciona em desktop e mobile (menu colapsável), em ambas as
      páginas (`index.html`, `sobre.html`).
- [x] ~~Se não houver peças com `destaque: true`, a seção de destaques não
      quebra — apenas não é exibida.~~ RF-04 removido — não se aplica.
- [ ] Navegar para `sobre.html` e voltar (`index.html`) preserva o
      catálogo/filtro sem erro; nenhum link de navegação quebrado entre as
      duas páginas.
