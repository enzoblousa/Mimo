# DESIGN.md — Mimmo Cerâmica

Documento de design técnico e visual. Implementa os requisitos de
`docs/specs/` respeitando as decisões em `docs/adr/`.

## 1. Estrutura de arquivos

```
/
├── index.html              # Página inicial (SPEC-0002)
├── catalogo.html           # Catálogo completo (SPEC-0001)
├── assets/
│   ├── css/
│   │   ├── base.css        # Reset, variáveis (cor/tipografia), utilitários
│   │   ├── layout.css       # Header, footer, grid, seções
│   │   └── componentes.css  # Card de produto, modal, filtros, botões
│   ├── js/
│   │   ├── produtos.js     # Fetch + render de data/produtos.json
│   │   ├── filtro.js       # Lógica de filtro/busca do catálogo
│   │   ├── modal.js        # Abrir/fechar detalhe da peça, focus trap
│   │   └── contato.js      # Construção de links wa.me a partir de config.json
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
**peças de modelo repetível** ao mesmo tempo — um booleano `disponivel`
simples não distingue "vendida", "sob encomenda" e "pronta entrega". O
schema usa dois campos: `tipo` (a natureza da peça) e `status` (o estado
comercial atual).

```json
[
  {
    "slug": "vaso-rose-01",
    "nome": "Vaso Rosé",
    "categoria": "Decorativas",
    "descricao": "Peça modelada à mão, acabamento em tom pastel.",
    "medidas": "Altura 22cm, diâmetro 14cm",
    "tecnica": "Modelagem manual",
    "preco": 25.0,
    "tipo": "modelo-repetivel",
    "status": "disponivel",
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
    "status": "sob-encomenda",
    "destaque": false,
    "imagens": [
      "assets/imagens/produtos/peca-unica-02-1.jpg"
    ]
  }
]
```

Campos obrigatórios: `slug`, `nome`, `categoria`, `descricao`, `preco`,
`tipo`, `status`, `imagens` (array com ≥ 1 item). Campos opcionais:
`medidas`, `tecnica`, `destaque` (default `false`).

- `tipo`: `"unica"` (peça personalizada, uma só existe) |
  `"modelo-repetivel"` (mesmo desenho, pode haver mais de uma unidade).
- `status`: `"disponivel"` (pronta entrega) | `"sob-encomenda"` (feita ao
  ser encomendada — típico de `tipo: "unica"`) | `"vendida"` (encerrada,
  não aparece com CTA de contato — ver SPEC-0001 RF-01 e
  SPEC-0003 RF-01).

`slug` é único, usado como `id` para deep-linking do modal
(`catalogo.html#vaso-rose-01`) e como base do nome de arquivo de imagem.

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
  "whatsapp": "5561995793905",
  "instagram": "https://instagram.com/flaviamangabeirab"
}
```

`whatsapp` e `instagram` apontam hoje para os canais **pessoais** da
Flávia (PRD §2 e §5) — quando a loja migrar para um Instagram dedicado,
só este arquivo precisa mudar (nenhum HTML/JS é tocado).

## 3. Fluxo de navegação

```
index.html (Hero, Sobre, Destaques)
   │  CTA "Ver catálogo"
   ▼
catalogo.html (Grade + Filtro + Busca)
   │  clique em um card
   ▼
Modal de detalhe (mesma página, via JS)
   │  CTA "Perguntar sobre esta peça"
   ▼
WhatsApp (wa.me, nova aba)
```

## 4. Direção visual

Sistema de tokens definido a partir do PRD (`docs/PRD.md` §2 e §9) — marca
nova, tom de voz aconchegante, colorido e intimista, paleta pastel
explicitamente pedida (rosa claro, vermelho suave, branco), evitando a
direção terrosa/terracota descartada e o "azul corporativo/gradiente SaaS"
genérico. Implementado em `assets/css/base.css`.

### Cor

| Token | Hex | Uso |
|---|---|---|
| `--cor-fundo` | `#FBF3EF` | Fundo geral — creme rosado, nunca branco puro |
| `--cor-superficie` | `#FFFDFB` | Cards e blocos elevados |
| `--cor-primaria` | `#EAB4AC` | Rosa claro — destaques suaves, fundos de selo |
| `--cor-acento` | `#C1594E` | Vermelho pastel queimado — CTAs, links, preço |
| `--cor-acento-escuro` | `#A8483F` | Hover/active do acento |
| `--cor-texto` | `#3A2620` | Marrom espresso — texto principal, nunca preto puro |
| `--cor-texto-suave` | `#7A6058` | Texto secundário/legendas |
| `--cor-borda` | `#E4D6CC` | Divisores e bordas sutis |

### Tipografia

- **Display** (`--fonte-display`): `'Fraunces', serif` — serifada de
  contornos orgânicos e levemente "tortos" (ótica soft/wonky), remete à
  imperfeição bonita de uma peça feita à mão. Uso restrito: nome da loja,
  títulos de seção, preço em destaque. Peso 500-600; itálico da família
  reservado para toques de destaque pontuais (ex. uma palavra no hero).
  Fallback: `Georgia, serif`.
- **Corpo** (`--fonte-corpo`): `'Nunito Sans', sans-serif` — humanista, com
  terminações arredondadas que conversam com o clima aconchegante/pastel,
  sem competir com a serifada. Uso: parágrafos, navegação, botões, labels.
  Fallback: `system-ui, sans-serif`.
- Escala tipográfica em `base.css` via `--texto-*` (xs/sm/base/lg/xl/2xl/3xl),
  em `rem`, razão ~1.25.

### Layout e forma — sinal de identidade

- **Cantos "torneados"**: em vez de `border-radius` uniforme, cards, botões
  e selos usam um raio assimétrico (`--raio-organico:
  12px 22px 12px 26px`), como se cada elemento tivesse sido moldado à mão
  — nunca perfeitamente simétrico, mas nunca desalinhado a ponto de parecer
  erro.
- **Etiqueta de preço**: o preço de cada peça aparece numa "tag" rotacionada
  (-2° a -4°), como uma etiqueta de papel amarrada com barbante numa feira
  de artesanato — reforça o storytelling de presente (PRD §3: peças também
  compradas como presente). Implementado como componente em
  `componentes.css` (Fase 2 de TASKS.md), token de rotação definido aqui:
  `--rotacao-tag: -3deg`.
- **Sombra**: sombra suave com tom quente (derivada de `--cor-texto` em
  baixa opacidade), nunca cinza/preto puro — mantém a paleta coesa mesmo
  em elementos elevados.
- **Espaçamento**: generoso, escala em `rem` (`--espaco-1` a `--espaco-6`)
  — "menos é mais", a peça (foto) é sempre o elemento principal do card.

### Fotografia

- Peças fotografadas com luz natural, fundo neutro, consistente entre
  produtos — mais importante para a percepção de qualidade do que
  qualquer efeito de UI.
- Enquanto não há fotos reais, placeholders usam `picsum.photos` (seed por
  slug, ver `data/produtos.json`) — ver risco registrado em ADR-0006.

## 5. Decisões de implementação

- Modal de detalhe é implementado com `<dialog>` nativo do HTML quando
  suportado, com fallback simples de `div` + `aria-modal` — evita reimplementar
  focus trap do zero.
- Filtro de categoria é derivado via `[...new Set(produtos.map(p =>
  p.categoria))]` — nunca lista hardcoded (RF-02 do SPEC-0001).
- `scripts/validar-produtos.js` roda com `node scripts/validar-produtos.js`
  antes de cada deploy (documentado em TASKS.md e CLAUDE.md).
