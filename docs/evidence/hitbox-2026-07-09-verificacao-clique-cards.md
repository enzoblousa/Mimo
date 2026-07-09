# Verificação — hitbox dos cards de produto (2026-07-09)

## Bug

Áreas do card de produto (`.card-produto`) não respondiam a clique em
telas ≥40rem (desktop/tablet). Causa raiz: `assets/css/componentes.css`,
regra `@media (min-width: 40rem) { .modal-produto { display: grid; ... } }`
aplicava `display: grid` ao `<dialog>` do modal **sem** o seletor
`[open]`, sobrescrevendo o `display: none` padrão do navegador para
`dialog:not([open])`. Resultado: mesmo fechado, o modal ficava
`position: fixed`, centralizado na tela, com `pointer-events: auto` —
uma caixa invisível (`opacity: 0`) roubando cliques de qualquer card que
estivesse por baixo dela.

## Correção

`assets/css/componentes.css`: seletor trocado de `.modal-produto` para
`.modal-produto[open]` dentro do media query de 40rem.

## Método de verificação

Excepcionalmente, com autorização explícita do usuário para esta
correção (ver CLAUDE.md — regra padrão é não usar Playwright/Chromium
neste projeto), foi instalado Playwright **temporariamente** apenas para
este diagnóstico, e removido em seguida (`node_modules`, cache
`~/.cache/ms-playwright` e scripts de teste todos apagados após o uso;
nenhuma dependência de Playwright ficou no projeto).

Passos:

1. Servidor estático local (`python3 -m http.server 8000`).
2. Script Playwright inspecionou `getComputedStyle` do `<dialog>` fechado
   em viewport desktop (1280×900): confirmou `display: grid`,
   `pointer-events: auto`, `position: fixed`, ocupando uma caixa real de
   ~799×211px no centro da tela — sobrepondo cards do catálogo.
3. Amostragem de pontos de clique (`document.elementFromPoint`) em grade
   dentro de cada um dos 10 cards do catálogo, em três viewports
   (1280×900, 800×900, 375×800):
   - **Antes da correção**: pontos no meio/rodapé de vários cards
     resolviam para elementos do modal (`.modal-produto__corpo`, botão
     `.botao--primario` do modal) em vez do card.
   - **Depois da correção**: `getComputedStyle` do dialog fechado voltou
     a `display: none`; todos os 10 cards × 3 viewports × pontos
     amostrados (topo/centro/base, esquerda/centro/direita) resolveram
     para dentro do próprio `.card-produto` — **0 falhas**.
4. Confirmado que o modal ainda funciona: clique num card abre o
   `<dialog>` (`open: true`, `display: grid`, hash `#<slug>` setado).

## Resultado

Bug corrigido e verificado ponta a ponta (clique real via automação de
navegador, não apenas leitura de código).
