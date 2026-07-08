# TASKS — Mimmo Cerâmica

Checklist de implementação derivado de `docs/specs/`. Marcar cada item ao
concluir e anexar evidência correspondente em `docs/evidence/` quando
aplicável (ver `docs/evidence/README.md`).

## Fase 0 — Base do projeto

- [x] Criar estrutura de pastas conforme `docs/design/DESIGN.md` (§1).
- [x] Criar `data/config.json` com dados reais da loja (nome "Mimmo",
      WhatsApp `5561995793905`, Instagram `@flaviamangabeirab`, texto
      "sobre" a escrever — ver PRD §2, §5, §7).
- [x] Criar `data/produtos.json` com **10 peças de exemplo** (escopo de
      lançamento, PRD §4) usando **imagens placeholder** (`picsum.photos`,
      PRD §7, ADR-0006) até existirem fotos reais das peças da Flávia.
      Preços na faixa R$ 15-30 (PRD §4), sem campo de quantidade em
      estoque, cobrindo os dois `tipo` (`unica`, `modelo-repetivel`) e os
      três `status` (`disponivel`, `sob-encomenda`, `vendida`).
- [x] Criar `assets/css/base.css` com variáveis de cor/tipografia/forma
      definidas na direção visual (DESIGN.md §4: paleta pastel, Fraunces +
      Nunito Sans, raio orgânico, tag de preço rotacionada).

## Fase 1 — Página inicial (SPEC-0002)

- [x] Estrutura semântica de `index.html` (header, hero, sobre, destaques,
      footer).
- [x] Hero com nome da loja, posicionamento e CTA "Ver catálogo".
- [x] Seção "Sobre" lendo texto de `config.json` — texto cobrindo
      diferencial "feito com carinho, handmade" e região de entrega (foco
      DF, aberto a combinar outras localidades) (PRD §2, §4; SPEC-0002
      RF-02).
- [x] Seção de destaques renderizando peças com `destaque: true` (omitida
      via `hidden` se não houver nenhuma — testado com 3 peças em destaque
      nos dados de exemplo).
- [x] Header responsivo com menu hambúrguer em mobile (`assets/js/inicio.js`
      + `assets/css/layout.css`).

> **Verificação parcial**: sintaxe JS checada (`node --check
> --input-type=module`), todos os assets referenciados retornam 200 via
> `curl` num servidor estático local, dados (`config.json`/`produtos.json`)
> validados como JSON. **Não foi verificado visualmente num navegador de
> verdade** — este projeto não usa Playwright/Chromium para isso (ver
> CLAUDE.md, "Verificação"). Recomenda-se abrir `index.html` manualmente
> (`python3 -m http.server` + navegador) antes de considerar a Fase 1
> 100% fechada.

## Fase 2 — Catálogo (SPEC-0001)

- [ ] `assets/js/produtos.js`: fetch de `produtos.json` e render dos cards.
- [ ] `assets/js/filtro.js`: filtro por categoria (derivado dos dados) +
      busca textual.
- [ ] Estado vazio ("nenhuma peça encontrada") para busca sem resultado e
      para catálogo vazio.
- [ ] Selos de `status` (pronta entrega / sob encomenda / vendida) e
      esmaecimento + remoção de CTA apenas para `status: "vendida"`
      (SPEC-0001 RF-01 revisado).
- [ ] `assets/js/modal.js`: modal/detalhe da peça com todas as fotos,
      descrição, medidas, técnica, preço.

## Fase 3 — Contato e conversão (SPEC-0003)

- [ ] `assets/js/contato.js`: gera link `wa.me` com mensagem pré-preenchida
      por peça, a partir de `slug`/`nome` + `config.json`.
- [ ] Links de contato geral (WhatsApp, Instagram) no header/footer, lidos
      de `config.json`.
- [ ] Checar que todos os links abrem em nova aba com
      `rel="noopener noreferrer"`.

## Fase 4 — Não-funcionais (SPEC-0004)

- [ ] Testar responsividade em 375px / 768px / 1440px — registrar
      screenshots em `docs/evidence/`.
- [ ] Auditoria de acessibilidade: `alt` em imagens, navegação por teclado,
      focus trap no modal, contraste de cor.
- [ ] `scripts/validar-produtos.js`: script Node puro que valida schema de
      `produtos.json` (campos obrigatórios, tipos, `slug` único).
- [ ] Rodar Lighthouse (mobile) em `index.html` e `catalogo.html` —
      registrar resultado em `docs/evidence/`.
- [ ] Meta tags de SEO/Open Graph em ambas as páginas.

## Fase 5 — Deploy (ADR-0005, ADR-0006) — **não-bloqueante por enquanto**

Sem prazo e sem domínio definidos (PRD §8); esta fase fica pendente até
haver decisão de lançar publicamente. Antes de executá-la, checar
obrigatoriamente o item de imagens (ADR-0006):

- [ ] **Pré-requisito**: substituir toda imagem placeholder por foto real
      da peça (ou imagem com licença adequada) — nenhuma foto de terceiro
      "emprestada" pode ir para produção.
- [ ] Configurar GitHub Pages para o repositório.
- [ ] Validar em produção: catálogo carrega, filtro funciona, links de
      WhatsApp abrem corretos.
- [ ] Atualizar `docs/evidence/` com prints/links do site em produção.

## Fora de escopo (não fazer sem nova ADR)

- Carrinho de compras, checkout ou pagamento online (ADR-0001).
- Backend, banco de dados ou CMS externo (ADR-0002, ADR-0003).
- Formulário de contato próprio (ADR-0004).
