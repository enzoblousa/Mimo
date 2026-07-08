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

Paleta e tipografia definitivas são escolhidas na implementação usando a
skill de design de front-end do projeto (evitar "cara de template
genérico"). Diretrizes vêm do PRD (`docs/PRD.md` §2 e §9) — marca nova,
tom de voz aconchegante, colorido e intimista:

- **Tom**: aconchegante, clean, intimista — não corporativo/tech. Evitar
  azul corporativo genérico e gradientes tipo SaaS.
- **Paleta de referência** (ajustável na implementação, tons exatos a
  definir na skill de design): **pastéis** — rosa claro, vermelho suave/
  pastel, branco, mantendo a sensação clean e aconchegante pedida no PRD.
  Evitar tons terrosos/terracota saturados (direção descartada após
  confirmação da Flávia) e evitar preto puro (#000) para manter o clima
  suave.
- **Tipografia**: uma fonte com personalidade e calor humano para títulos
  (ex. serifada humanista ou script discreta — decidir na implementação,
  evitando algo frio/geométrico demais), sans-serif legível para corpo de
  texto. Escala tipográfica consistente (ver skill de design).
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
