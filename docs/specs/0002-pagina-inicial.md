# SPEC-0002: Página Inicial

- Status: Aceito
- ADRs relacionados: [0001](../adr/0001-escopo-vitrine-estatica.md)

## Objetivo

Apresentar a marca Mimo, transmitir a identidade artesanal/handmade e
conduzir a visitante até o catálogo.

## Requisitos funcionais

### RF-01: Hero

- Seção de abertura com nome da loja ("Mimo"), uma frase de posicionamento
  (ex. "Cerâmica feita à mão, peça por peça") e uma imagem/foto de destaque.
- Botão de CTA principal "Ver catálogo" que rola/navega até a seção/página de
  peças (SPEC-0001).

### RF-02: Sobre a loja

- Bloco curto (2-4 parágrafos ou menos) contando a história da loja/artesã,
  com foto opcional do ateliê ou processo.
- Conteúdo vem de `data/config.json` (campo `sobre`), não hardcoded no HTML,
  para permitir edição sem mexer em marcação.

### RF-03: Navegação

- Header fixo ou no topo com: logo/nome, link para Catálogo, link para
  Sobre, e ícones/links de contato (Instagram, WhatsApp).
- Em mobile, navegação colapsa em menu hambúrguer (ver SPEC-0004).

### RF-04: Destaques (opcional)

- Seção "Peças em destaque" mostrando até N peças marcadas com
  `destaque: true` em `produtos.json`, como amostra antes do catálogo
  completo.

## Critérios de aceite

- [ ] CTA "Ver catálogo" leva à listagem completa de peças.
- [ ] Texto de "Sobre" é lido de `data/config.json`, editável sem tocar em
      HTML/CSS.
- [ ] Header funciona em desktop e mobile (menu colapsável).
- [ ] Se não houver peças com `destaque: true`, a seção de destaques não
      quebra — apenas não é exibida.
