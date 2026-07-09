# Redesign visual: tipografia delicada e menos decoração — design

Status: aprovado pelo usuário em 2026-07-08.

## Contexto

O usuário pediu para usar https://ateliedasah.com/ como inspiração: fonte
delicada, visual simples, foco em mostrar os produtos. O site atual
(`docs/design/DESIGN.md` §4) já tem uma identidade pastel implementada
(Fase 0-4 do `TASKS.md`): fontes serifadas orgânicas (Fraunces + Nunito
Sans), cantos "torneados" bem assimétricos, etiqueta de preço rotacionada
-3°, sombra colorida.

Decisão de escopo (confirmada com o usuário): **não é um redesign
completo**. A paleta pastel e a estrutura de tokens continuam — isso não é
mudança de ADR, é um ajuste de valores dentro do sistema de design já
existente em `DESIGN.md` §4. Ajusta-se: tipografia (troca de família),
intensidade da decoração (reduzida, não removida) e espaçamento (mais
generoso). Vale para o site inteiro (index, catálogo, modal), já que os
três compartilham `assets/css/*.css`.

## 1. Tipografia

- Trocar fonte display de `Fraunces` para **`Jost`** (Google Fonts) —
  sans-serif geométrica de traços finos, ar art-déco discreto, "delicada"
  sem perder o toque de identidade de marca.
- `--fonte-display` passa de peso 500-600 para peso **300-400** (mais fina).
  Itálico de destaque pontual (hoje usado no hero) é removido — `Jost` não
  precisa de itálico para o efeito de destaque; usar peso ou cor em vez
  disso, se necessário.
- `--fonte-corpo` (`Nunito Sans`) **não muda** — já é uma sans-serif
  humanista adequada ao tom "delicado".
- Fallback de `--fonte-display` muda de `Georgia, serif` (serifada) para
  `system-ui, sans-serif`, consistente com a troca de família.
- Implementação: trocar o `@import` do Google Fonts em `base.css:8` (retirar
  `Fraunces`, adicionar `Jost:wght@300;400;500`) e o token
  `--fonte-display` em `base.css:26`.

## 2. Cor

Sem mudança nos valores de tokens de cor (`--cor-fundo`, `--cor-acento`,
etc. — tabela em `DESIGN.md` §4 continua valendo tal como está, incluindo
os ajustes de contraste WCAG AA já documentados). O que muda é o **uso**: o
grid de produtos deve depender menos de cor de fundo do card e mais da foto
do produto como ponto de cor — na prática, isso decorre naturalmente do
ajuste de espaçamento (seção 4) e não exige nenhum novo token.

## 3. Forma e decoração — reduzir intensidade, não remover

| Token/elemento | Valor atual | Valor novo |
|---|---|---|
| `--raio-organico` | `12px 22px 12px 26px` | `10px 14px 10px 16px` |
| `--rotacao-tag` | `-3deg` | `-1deg` |
| Sombra (cards/elementos elevados) | opacidade atual definida a partir de `--cor-texto` | mesma cor-base, opacidade ~50% do valor atual, blur reduzido proporcionalmente |

Bordas/divisores (`--cor-borda`) não mudam.

## 4. Espaçamento e grid

Aumentar o "ar" ao redor de cada peça no catálogo:

- Gap do grid de produtos: subir um degrau na escala `--espaco-*` já
  existente (ex. de `--espaco-4` para `--espaco-5`/`--espaco-6`, ajustando
  ao valor real usado hoje em `layout.css`).
- Padding interno dos cards (`componentes.css`): aumentar
  proporcionalmente ao novo gap, mesma lógica de escala.
- Nenhuma mudança na estrutura do grid (continua CSS Grid responsivo já
  implementado) — é ajuste de valores, não de layout.

## Fora de escopo (confirmado)

- Não mexe em `data/produtos.json`, `config.json`, nem em nenhum JS —
  puramente CSS (`base.css`, `layout.css`, `componentes.css`) + o `@import`
  de fonte.
- Não reabre ADR-0001 a ADR-0006 — placeholders, escopo de vitrine estática
  e stack vanilla continuam como estão.
- Fundo geral não vira branco puro (decisão já registrada em `DESIGN.md`
  §4 permanece: "nunca branco puro").
- Não altera `docs/tasks/TASKS.md` fases já concluídas — é um ajuste sobre
  trabalho já entregue, registrado como sua própria entrada de tarefa.

## Arquivos afetados

- `assets/css/base.css` — `@import` de fonte, `--fonte-display`,
  `--raio-organico`, `--rotacao-tag`, tokens de sombra.
- `assets/css/layout.css` — gap do grid.
- `assets/css/componentes.css` — padding dos cards, uso de
  `--raio-organico`/`--rotacao-tag`/sombra nos componentes (card, selo,
  botão, modal).
- `docs/design/DESIGN.md` §4 — atualizar a tabela/texto de tipografia e
  forma para refletir os novos valores (a paleta de cor da §4 não muda).

## Verificação

Sem testes automatizados de UI neste projeto (ver CLAUDE.md — proibido
Playwright/Chromium). Verificação via:

1. `node --check` em qualquer JS tocado (não deve haver, ver "fora de
   escopo").
2. Servir localmente (`python3 -m http.server 8000`) e conferir visualmente
   index.html, catalogo.html e o modal de produto no navegador — título,
   cards, etiqueta de preço, cantos, espaçamento.
3. Registrar evidência em `docs/evidence/` conforme convenção existente
   (`docs/evidence/README.md`), se essa pasta já tiver um padrão para
   mudanças de UI puramente visuais.
