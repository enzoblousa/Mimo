# DESIGN.md — Mimo Cerâmica

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

```json
[
  {
    "slug": "vaso-terra-01",
    "nome": "Vaso Terra",
    "categoria": "Vasos",
    "descricao": "Vaso torneado à mão em argila vermelha, acabamento fosco.",
    "medidas": "Altura 22cm, diâmetro 14cm",
    "tecnica": "Torno",
    "preco": 189.9,
    "disponivel": true,
    "destaque": true,
    "imagens": [
      "assets/imagens/produtos/vaso-terra-01-1.jpg",
      "assets/imagens/produtos/vaso-terra-01-2.jpg"
    ]
  }
]
```

Campos obrigatórios: `slug`, `nome`, `categoria`, `descricao`, `preco`,
`disponivel`, `imagens` (array com ≥ 1 item). Campos opcionais: `medidas`,
`tecnica`, `destaque` (default `false`).

`slug` é único, usado como `id` para deep-linking do modal
(`catalogo.html#vaso-terra-01`) e como base do nome de arquivo de imagem.

### `data/config.json`

```json
{
  "nomeLoja": "Mimo",
  "posicionamento": "Cerâmica feita à mão, peça por peça",
  "sobre": "Texto curto sobre a loja/artesã...",
  "whatsapp": "5511999999999",
  "instagram": "https://instagram.com/mimo.ceramica"
}
```

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

Paleta e tipografia definitivas são escolhidas na implementação usando a
skill de design de front-end do projeto (evitar "cara de template
genérico"). Diretrizes que o design deve seguir, por ser uma marca de
cerâmica artesanal:

- **Tom**: quente, orgânico, artesanal — não corporativo/tech. Evitar azul
  corporativo genérico e gradientes tipo SaaS.
- **Paleta de referência** (ajustável na implementação): tons terrosos —
  terracota, areia, marrom argila, com um neutro claro (off-white/cru) de
  fundo. Evitar branco puro (#fff) e preto puro (#000) para manter a sensação
  tátil.
- **Tipografia**: uma serifada ou serifada-humanista para títulos (remete a
  ofício/artesania), sans-serif legível para corpo de texto. Escala
  tipográfica consistente (ver skill de design).
- **Fotografia**: peças fotografadas com luz natural, fundo neutro,
  consistente entre produtos — mais importante para a percepção de qualidade
  do que qualquer efeito de UI.
- **Cards de produto**: foto em destaque, cantos suavemente arredondados,
  espaçamento generoso (menos é mais — não competir com a peça).

## 5. Decisões de implementação

- Modal de detalhe é implementado com `<dialog>` nativo do HTML quando
  suportado, com fallback simples de `div` + `aria-modal` — evita reimplementar
  focus trap do zero.
- Filtro de categoria é derivado via `[...new Set(produtos.map(p =>
  p.categoria))]` — nunca lista hardcoded (RF-02 do SPEC-0001).
- `scripts/validar-produtos.js` roda com `node scripts/validar-produtos.js`
  antes de cada deploy (documentado em TASKS.md e CLAUDE.md).
