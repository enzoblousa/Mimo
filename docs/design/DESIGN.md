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
│   │   └── componentes.css  # Card de produto, modal, filtros, botões
│   ├── js/
│   │   ├── config.js       # Fetch de data/config.json (nome, contato, sobre)
│   │   ├── menu.js         # ativarMenuMobile() — compartilhado por
│   │   │                   # inicio.js e sobre.js
│   │   ├── produtos.js     # Fetch de data/produtos.json + criarCardProduto()
│   │   ├── inicio.js       # Bootstrap de index.html: hero, filtro/busca,
│   │   │                   # grade, modal (usa todos os módulos abaixo)
│   │   ├── sobre.js        # Bootstrap de sobre.html: identidade, contato,
│   │   │                   # texto "sobre"
│   │   ├── filtro.js       # Categorias dinâmicas + busca textual
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
natureza da peça). O schema **não tem campo de estado comercial**: um
campo `status` (`disponivel`/`sob-encomenda`/`vendida`) chegou a existir,
mas foi removido por completo em 2026-07-09 (decisão do usuário) — ver
nota abaixo.

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
`tecnica`, `destaque` (default `false`).

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
nova, tom de voz aconchegante, colorido e intimista. **Paleta floral
(2026-07-08, decisão do usuário)**: cores extraídas de
`imagens/foto-flores-exemplo-cores-usar.png` (buquê com rosa/magenta,
laranja, dourado, verde e azul), substituindo a paleta pastel anterior
(rosa claro + vermelho suave apenas). Implementado em `assets/css/base.css`.

### Cor

| Token | Hex | Uso |
|---|---|---|
| `--cor-fundo` | `#FBF3EF` | Fallback sólido do fundo (navegadores sem gradiente) |
| `--cor-superficie` | `#FFFDFB` | Cards e blocos elevados — permanece neutro de propósito, pra manter foto/texto do produto legíveis mesmo com o fundo colorido |
| `--cor-primaria` | `#F1B8CC` | Rosa médio — tag de preço, seleção de texto |
| `--cor-acento` | `#B02857` | Magenta profundo (rosas do buquê) — CTAs, links, filtro ativo |
| `--cor-acento-escuro` | `#8F2046` | Hover/active do acento |
| `--cor-texto` | `#3A2620` | Marrom espresso — texto principal, nunca preto puro |
| `--cor-texto-suave` | `#725A50` | Texto secundário/legendas (escurecido de `#7A6058` pra manter contraste sobre os novos fundos) |
| `--cor-borda` | `#E4D6CC` | Divisores e bordas sutis |
| `--cor-flor-rosa` | `#F7D6E2` | Tom 1 do gradiente floral — também fundo sólido do header/nav mobile |
| `--cor-flor-laranja` | `#FAE7D5` | Tom 2 do gradiente floral |
| `--cor-flor-amarelo` | `#F7EDD5` | Tom 3 do gradiente floral |
| `--cor-flor-verde` | `#E5E9D8` | Tom 4 do gradiente floral |
| `--cor-flor-azul` | `#DEE9F2` | Tom 5 do gradiente floral |
| `--gradiente-floral` | `linear-gradient(135deg, ...)` | Os 5 tons acima em sequência — usado no `body` (fundo geral) e `.hero` |

> **Contraste (SPEC-0004)**: todos os pares texto/fundo relevantes da
> paleta floral foram checados contra WCAG AA (4.5:1 para texto normal)
> com a fórmula de luminância relativa. O par mais apertado é
> `--cor-texto-suave` sobre `--cor-flor-rosa`, em 4.64:1 — todos os demais
> (inclusive `--cor-acento` sobre cada um dos 5 tons do gradiente, usado em
> links/hover no header) ficam entre 4.77:1 e 12:1. `--cor-texto-suave` foi
> escurecido de `#7A6058` para `#725A50` especificamente para essa margem;
> sem esse ajuste, o par mais apertado ficava em 4.19:1 (abaixo do
> mínimo). Cards continuam com `--cor-superficie` neutro (branco) — não
> fazem parte do gradiente colorido, decisão do usuário para manter a
> grade de produtos legível.
>
> (Nota histórica: a paleta anterior tinha um ajuste de contraste em
> `--cor-acento` de `#C1594E` para `#BB5245`, e em `.selo--vendida` — o
> componente de selo deixou de ser lido pela UI em 2026-07-08 e teve seu
> código (`.selo*` em `componentes.css`, markup em `index.html`, lógica em
> `produtos.js`/`modal.js`) e o campo `status` removidos por completo em
> 2026-07-09, ver SPEC-0001 RF-01, antes desta troca de paleta.)

### Tipografia

- **Display** (`--fonte-display`): `'Jost', sans-serif` — geométrica, traços
  finos, ar delicado (inspirada em ateliedasah.com — ver
  `docs/superpowers/specs/2026-07-08-redesign-visual-delicado-design.md`).
  Uso restrito: nome da loja, títulos de seção, preço em destaque. Peso
  400-500 (título 400, logo e preço 500). Fallback: `system-ui, sans-serif`.
- **Corpo** (`--fonte-corpo`): `'Nunito Sans', sans-serif` — humanista, com
  terminações arredondadas que conversam com o clima aconchegante/pastel,
  sem competir com a serifada. Uso: parágrafos, navegação, botões, labels.
  Fallback: `system-ui, sans-serif`.
- Escala tipográfica em `base.css` via `--texto-*` (xs/sm/base/lg/xl/2xl/3xl),
  em `rem`, razão ~1.25.

### Layout e forma — sinal de identidade

- **Cantos "torneados"**: em vez de `border-radius` uniforme, cards e
  botões usam um raio levemente assimétrico (`--raio-organico:
  10px 14px 10px 16px`) — assimetria sutil, quase imperceptível, ajustada
  para um visual mais delicado (ver nota de redesign abaixo).
- **Etiqueta de preço**: o preço de cada peça aparece numa "tag" com leve
  rotação (`--rotacao-tag: -1deg`) — mantém o storytelling de presente
  (PRD §3) sem o efeito de "colada torta" da versão anterior.
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
- Filtro de categoria é derivado via `[...new Set(produtos.map(p =>
  p.categoria))]` — nunca lista hardcoded (RF-02 do SPEC-0001).
- `scripts/validar-produtos.js` roda com `node scripts/validar-produtos.js`
  antes de cada deploy (documentado em TASKS.md e CLAUDE.md).
