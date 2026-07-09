# DESIGN.md — Mimmo Cerâmica

Documento de design técnico e visual. Implementa os requisitos de
`docs/specs/` respeitando as decisões em `docs/adr/`.

## 1. Estrutura de arquivos

```
/
├── index.html              # Hero (SPEC-0002 RF-01) + catálogo completo
│                            # (SPEC-0001) — sem página de catálogo separada
│                            # desde 2026-07-08.
├── sobre.html               # Página "Sobre" (SPEC-0002 RF-02), separada da
│                            # home desde 2026-07-09.
├── assets/
│   ├── css/
│   │   ├── base.css        # Reset, variáveis (cor/tipografia), utilitários
│   │   ├── layout.css       # Header, footer, grid, seções (compartilhado
│   │   │                    # por index.html e sobre.html)
│   │   └── componentes.css  # Card de produto, modal, busca, botões
│   ├── js/
│   │   ├── config.js       # Fetch de data/config.json (nome, contato, sobre)
│   │   ├── menu.js         # ativarMenuMobile() — compartilhado por
│   │   │                   # inicio.js e sobre.js
│   │   ├── produtos.js     # Fetch de data/produtos.json + criarCardProduto()
│   │   ├── inicio.js       # Bootstrap de index.html: hero, busca, grade,
│   │   │                   # modal (usa todos os módulos abaixo)
│   │   ├── sobre.js        # Bootstrap de sobre.html: identidade, contato,
│   │   │                   # texto "sobre"
│   │   ├── filtro.js       # Busca textual (nome/descrição)
│   │   ├── contato.js      # Link do CTA por peça → perfil do Instagram
│   │   └── modal.js        # <dialog> de detalhe, deep-link por slug
│   └── imagens/
│       ├── produtos/<slug>.jpg
│       └── site/ (hero, sobre, favicon, og-image)
├── data/
│   ├── produtos.json       # Fonte única de verdade das peças (ADR-0003)
│   └── config.json         # Nome da loja, contato, texto "sobre"
├── scripts/
│   └── validar-produtos.js # Valida schema de produtos.json (Node puro)
└── docs/                   # Esta documentação (ADR/Specs/Design/Tasks/Evidence)
```

Sem `node_modules`, sem `package.json` obrigatório para rodar — o site abre
direto num navegador ou via qualquer servidor estático (ADR-0002).

## 2. Schema de dados

### `data/produtos.json`

Segundo o PRD (§4), a Flávia produz **peças únicas/personalizadas** e
**peças de modelo repetível** ao mesmo tempo — daí o campo `tipo` (a
natureza da peça). O schema **não tem campo de estado comercial** (campo
`status` removido em 2026-07-09). O campo `categoria` **existe** — foi
removido e reintroduzido no mesmo dia (2026-07-09, decisões do usuário) —
agora como enum fixo de 5 valores (ver SPEC-0001 RF-02).

```json
[
  {
    "slug": "vaso-rose-01",
    "nome": "Vaso Rosé",
    "categoria": "Decorativas",
    "descricao": "Peça modelada à mão, acabamento em tom pastel.",
    "medidas": "Altura 22cm, diâmetro 14cm",
    "preco": 25.0,
    "tipo": "modelo-repetivel",
    "destaque": true,
    "imagens": [
      "assets/imagens/produtos/vaso-rose-01-1.jpg"
    ]
  },
  {
    "slug": "peca-unica-02",
    "nome": "Tigela Aconchego",
    "categoria": "Utilitárias",
    "descricao": "Peça única, feita sob encomenda.",
    "preco": 30.0,
    "tipo": "unica",
    "destaque": false,
    "imagens": [
      "assets/imagens/produtos/peca-unica-02-1.jpg"
    ]
  }
]
```

Campos obrigatórios: `slug`, `nome`, `categoria`, `descricao`, `preco`,
`tipo`, `imagens` (array com ≥ 1 item). Campos opcionais: `medidas`,
`destaque` (default `false`).

> **Campo `tecnica` removido (2026-07-09, decisão do usuário)**: o schema
> chegou a ter um campo opcional `tecnica` (ex. "Torno", "Modelagem
> manual"), exibido como uma linha a mais no modal de detalhe
> (`data-modal-linha-tecnica`). Removido por completo — toda peça da
> Mimmo é feita à mão, então o campo não distinguia nada de fato e virou
> ruído no schema e no modal. `data/produtos.json` e
> `scripts/validar-produtos.js` não conhecem mais `tecnica`.

- `categoria`: um dos 6 valores fixos — `"Decorativas"`, `"Utilitárias"`,
  `"Animais"`, `"Porta-copos"`, `"Porta-Joias"`, `"Para Presentear"`
  (lista também vive em `CATEGORIAS`, `assets/js/filtro.js`, e é validada
  em `scripts/validar-produtos.js`). Diferente da implementação original
  (removida em 2026-07-09), a lista de categorias não é mais calculada a
  partir dos dados — é fixa, então uma categoria sem nenhuma peça ainda
  aparece no filtro do catálogo.
- `tipo`: `"unica"` (peça personalizada, uma só existe) |
  `"modelo-repetivel"` (mesmo desenho, pode haver mais de uma unidade).

> **Campo `status` removido (2026-07-09, decisão do usuário)**: o schema
> chegou a ter um campo `status` (`"disponivel"` | `"sob-encomenda"` |
> `"vendida"`). Em 2026-07-08 sua leitura pela UI já tinha sido removida
> (sem selo/rótulo, sem esmaecimento de peça vendida, sem variação de
> CTA); em 2026-07-09 o campo foi removido do schema por completo —
> `data/produtos.json` e `scripts/validar-produtos.js` não conhecem mais
> `status`. Toda peça é visualmente igual e sempre tem CTA de contato,
> independente de estado comercial (SPEC-0001 RF-01, SPEC-0003 RF-01).

`slug` é único, usado como `id` para deep-linking do modal
(`index.html#vaso-rose-01`) e como base do nome de arquivo de imagem.

> **Nota de risco (PRD §7)**: enquanto não há fotos reais das peças, as
> imagens em `assets/imagens/produtos/` são placeholders obtidos na
> internet. Isso é aceitável apenas em ambiente local de desenvolvimento —
> ver ADR-0006, que bloqueia deploy público (ADR-0005) enquanto o
> catálogo depender de fotos de terceiros.

### `data/config.json`

```json
{
  "nomeLoja": "Mimmo",
  "posicionamento": "Cerâmica feita à mão, peça por peça",
  "sobre": "Texto curto sobre a loja/artesã...",
  "instagram": "https://instagram.com/flaviamangabeirab"
}
```

`instagram` aponta hoje para o canal **pessoal** da Flávia (PRD §2 e §5) —
quando a loja migrar para um Instagram dedicado, só este arquivo precisa
mudar (nenhum HTML/JS é tocado). O campo `whatsapp` existiu neste schema
até 2026-07-09, quando o WhatsApp foi removido como canal de contato do
site (decisão do usuário, ver ADR-0004) — Instagram é o único canal.

## 3. Fluxo de navegação

Catálogo completo mora em `index.html` desde 2026-07-08 (sem página de
catálogo separada, sem seção "Destaques" — ver notas de redesign em
SPEC-0002). Desde 2026-07-09 o site tem uma segunda página, `sobre.html`,
para o conteúdo institucional (SPEC-0002 RF-02):

```
index.html (Hero → Grade + Filtro + Busca, tudo na mesma página)
   │  clique em um card
   ▼
Modal de detalhe (mesma página, via JS, deep-link #slug)
   │  CTA "Perguntar no Instagram"
   ▼
Instagram (perfil da loja, nova aba)

index.html ⇄ sobre.html
   │  header: link "Sobre" / hero: CTA "Conhecer a Flávia"     (ida)
   │  header: link "Catálogo" (→ index.html#catalogo)          (volta)
   ▼
sobre.html (texto institucional lido de data/config.json)
```

## 4. Direção visual

Sistema de tokens definido a partir do PRD (`docs/PRD.md` §2 e §9) — marca
nova, tom de voz aconchegante, colorido e intimista.

> **Histórico de paletas**: a paleta original (terracota queimada + oliva,
> Fase 0) e uma paleta "floral" multi-tom (rosa/laranja/dourado/verde/azul)
> chegaram a ser **documentadas** em versões anteriores desta seção, mas a
> paleta floral nunca foi de fato implementada em `assets/css/base.css` —
> o código seguiu com os tokens terracota da Fase 0 até 2026-07-09. **Paleta
> em tons de rosa (2026-07-09, decisão do usuário)** substitui a paleta
> terracota diretamente — implementada e verificada abaixo, desta vez com
> os tokens realmente atualizados em `base.css`/`layout.css`/`componentes.css`.

### Cor

| Token | Hex | Uso |
|---|---|---|
| `--cor-fundo` | `#FDF1F4` | Fundo geral (`body`), sob a textura de grão |
| `--cor-fundo-painel` | `#F7DFE6` | Painéis levemente destacados (`.sobre`, placeholder de imagem do card) |
| `--cor-superficie` | `#FFFBFC` | Cards e blocos elevados — quase branco, de propósito, pra manter foto/texto do produto legíveis |
| `--cor-primaria` | `#F0AEC7` | Rosa médio — tag de preço, seleção de texto |
| `--cor-acento` | `#B23368` | Rosa/berry profundo — CTAs, links, filtro ativo |
| `--cor-acento-escuro` | `#8C2350` | Hover/active do acento |
| `--cor-rosa-secundaria` | `#D98BAA` | Rosa dusty — disco decorativo interno do hero (substitui o antigo `--cor-oliva`) |
| `--cor-texto` | `#3D1626` | Vinho/ameixa escuro — texto principal, nunca preto puro |
| `--cor-texto-suave` | `#7A4F60` | Texto secundário/legendas |
| `--cor-borda` | `#EAD0DA` | Divisores e bordas sutis |
| `--cor-escuro` | `#2B1420` | Fundo do rodapé |
| `--cor-escuro-texto` | `#F8E9EF` | Texto sobre `--cor-escuro` |
| `--cor-escuro-borda` | `#4A2434` | Borda do rodapé |

`--cor-oliva` e `--cor-mostarda` (paleta terracota) foram removidos — não
existe mais nenhum tom fora da família rosa/vinho no sistema de cor.

> **Contraste (SPEC-0004)**: todos os pares texto/fundo relevantes foram
> checados contra WCAG AA (4.5:1 para texto normal) com a fórmula de
> luminância relativa (script Node ad-hoc, não commitado). Resultados:
> `--cor-texto` sobre `--cor-fundo`/`--cor-superficie`/`--cor-fundo-painel`
> entre 12.4:1 e 15.3:1; `--cor-texto-suave` sobre os mesmos três fundos
> entre 5.3:1 e 6.6:1; `--cor-acento` sobre `--cor-fundo`/`--cor-superficie`/
> `--cor-fundo-painel` entre 4.67:1 e 5.74:1; `--cor-acento-escuro` sobre
> `--cor-fundo`/`--cor-superficie` acima de 7.7:1; `--cor-escuro-texto`
> sobre `--cor-escuro` em 14.6:1; `--cor-acento` sobre `--cor-escuro-texto`
> (link do CTA no rodapé escuro) em 5.02:1. Todos os pares ficam acima do
> mínimo de 4.5:1 — nenhum ajuste adicional de tom foi necessário desta vez.
> Cards continuam com `--cor-superficie` neutro, mesma decisão de sempre
> (manter a grade de produtos legível).

### Tipografia

> **Nota (2026-07-09)**: esta seção descrevia Jost como já implementado
> desde 2026-07-08, mas — mesmo padrão de mismatch já visto na paleta de
> cor (Fase 4.8 vs. 4.13) — o CSS continuou com `Fraunces` até hoje.
> Implementado de verdade agora, a pedido do usuário ("fonte mais soft,
> leve e vibes" para o nome da loja, nomes de produto e preços).

- **Display** (`--fonte-display`): `'Jost', sans-serif` — geométrica, traços
  finos, ar delicado (inspirada em ateliedasah.com — ver
  `docs/superpowers/specs/2026-07-08-redesign-visual-delicado-design.md`).
  Uso restrito: nome da loja (`.logo`, `h1`), nomes de produto (`h2`/`h3`
  no card e no modal) e preço em destaque (`.tag-preco`). Pesos 300-600
  carregados; título usa 400, `h3` (nome no card)/`.logo`/preço usam 500,
  preço do modal usa 600. Fallback: `"Century Gothic", sans-serif`.
- **Corpo** (`--fonte-corpo`): `'Work Sans', sans-serif` — humanista,
  sem competir com o display. Uso: parágrafos, navegação, botões, labels.
  Fallback: `system-ui, sans-serif`. (Nota: versões anteriores desta seção
  citavam "Nunito Sans" como fonte de corpo — nunca foi implementado; o
  código sempre usou Work Sans desde a Fase 0.)
- Escala tipográfica em `base.css` via `--texto-*` (xs/sm/base/lg/xl/2xl/3xl),
  em `rem`, razão ~1.25.

### Layout e forma — sinal de identidade

- **Cantos "torneados"**: em vez de `border-radius` uniforme, cards e
  botões usam um raio levemente assimétrico (`--raio-organico:
  10px 14px 10px 16px`) — assimetria sutil, quase imperceptível, ajustada
  para um visual mais delicado (ver nota de redesign abaixo).
- **Etiqueta de preço**: o preço aparece só como número em destaque
  (`--fonte-display`, peso 300), sem carimbo, sem rotação, sem borda —
  mesma formatação no card do catálogo e no modal de detalhe
  (**2026-07-09, decisão do usuário**: modal simplificado para igualar o
  card). O carimbo circular tracejado com rotação da Fase 0 (referência
  a "feira de artesanato", PRD §3) foi removido; `--rotacao-tag-preco`
  não existe mais no schema de tokens.
- **Sombra**: sombra suave com tom quente (derivada de `--cor-texto`),
  opacidade e blur reduzidos para reforçar o visual mais limpo, nunca
  cinza/preto puro.

> **Nota de redesign (2026-07-08)**: valores de tipografia e forma acima
> foram ajustados a partir da direção original (Fraunces, raio
> `12px 22px 12px 26px`, rotação `-3deg`) para um visual mais delicado,
> inspirado em ateliedasah.com. A paleta de cor (tabela acima) não mudou.
> Ver `docs/superpowers/specs/2026-07-08-redesign-visual-delicado-design.md`.
- **Espaçamento**: generoso, escala em `rem` (`--espaco-1` a `--espaco-6`)
  — "menos é mais", a peça (foto) é sempre o elemento principal do card.

### Fotografia

- Peças fotografadas com luz natural, fundo neutro, consistente entre
  produtos — mais importante para a percepção de qualidade do que
  qualquer efeito de UI.
- Enquanto não há fotos reais, placeholders usam `picsum.photos` (seed por
  slug, ver `data/produtos.json`) — ver risco registrado em ADR-0006.

## 5. Decisões de implementação

- Modal de detalhe é implementado com `<dialog>` nativo do HTML
  (`showModal()`), sem fallback de `div` + `aria-modal` — o suporte a
  `<dialog>` é amplo o suficiente hoje (todos os browsers evergreen) para
  não justificar reimplementar focus trap/Esc na mão para este projeto
  pequeno. Deep-link por `#slug` é tratado via evento `hashchange`
  (`assets/js/modal.js`), tanto para abrir `index.html#slug` direto quanto
  para clique num card dentro da própria página (única, desde 2026-07-08).
- `scripts/validar-produtos.js` roda com `node scripts/validar-produtos.js`
  antes de cada deploy (documentado em TASKS.md e CLAUDE.md).
