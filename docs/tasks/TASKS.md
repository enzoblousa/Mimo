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

- [x] `assets/js/produtos.js`: fetch de `produtos.json` e render dos cards
      (feito na Fase 1, reaproveitado aqui na grade completa).
- [x] `assets/js/filtro.js`: filtro por categoria (derivado dos dados) +
      busca textual, combináveis.
- [x] Estado vazio ("nenhuma peça encontrada") para busca sem resultado e
      para catálogo vazio (`catalogo.html` + `catalogo.js`).
- [x] Selos de `status` (pronta entrega / sob encomenda / vendida) e
      esmaecimento apenas visual para `status: "vendida"` — **correção**:
      o card vendida continua clicável (abre o detalhe), só o modal não
      mostra CTA de contato (SPEC-0001 RF-01 + SPEC-0003 RF-01).
- [x] `assets/js/modal.js`: `<dialog>` nativo com galeria (miniaturas),
      descrição, medidas/técnica (linhas ocultas se ausentes), preço, selo
      de status e deep-link via `#slug` (evento `hashchange`).
- [x] `catalogo.html`: filtros dinâmicos, busca, grade e modal integrados.

## Fase 3 — Contato e conversão (SPEC-0003)

- [x] `assets/js/contato.js`: gera link `wa.me` com mensagem pré-preenchida
      por peça (varia por `status`), a partir de `nome` + `config.json`;
      retorna `null` (sem CTA) para peça `vendida`.
- [x] Links de contato geral (WhatsApp, Instagram) no header/footer, lidos
      de `config.json` (feito na Fase 1, presente em `index.html` e
      `catalogo.html`).
- [x] Checar que todos os links abrem em nova aba com
      `rel="noopener noreferrer"` (header, footer e CTA do modal).

> **Verificação parcial** (Fase 2 e 3): sintaxe de todos os `.js` checada
> com `node --check --input-type=module`; `catalogo.html` e os módulos
> novos retornam 200 num servidor estático local; lógica revisada
> manualmente (nomes de classe/seletor `data-*` batendo entre JS e CSS,
> fluxo de hash/modal). **Não verificado visualmente num navegador** — sem
> Playwright/Chromium neste projeto (ver CLAUDE.md). Recomenda-se abrir
> `catalogo.html` manualmente antes de considerar a Fase 2/3 100%
> fechadas: testar filtro, busca, abrir/fechar modal (Esc, clique fora,
> botão fechar), deep-link `catalogo.html#<slug>` e o link do WhatsApp por
> peça.

## Fase 4 — Não-funcionais (SPEC-0004)

- [x] Auditoria de acessibilidade (revisão de código, sem navegador):
      `alt` correto em imagens de produto/modal, todos os controles são
      elementos nativos (`a`/`button`/`input`) logo navegáveis por teclado
      por padrão, `<dialog>` nativo dá focus trap + Esc de graça,
      `:focus-visible` global em `base.css`. **Contraste de cor calculado
      via fórmula WCAG** (não visualmente) — achou 3 pares abaixo de
      4.5:1 e corrigiu: `--cor-acento` de `#C1594E` para `#BB5245` e
      `.selo--vendida` trocado para `--cor-texto` (ver DESIGN.md §4, nota
      de contraste).
- [x] `scripts/validar-produtos.js`: script Node puro (sem dependências)
      validando campos obrigatórios, tipos, enums (`tipo`/`status`) e
      unicidade de `slug`. Testado com dados válidos (10/10 OK) e com 3
      erros propositais (campo faltando, enum inválido, slug duplicado) —
      pegou os 3 corretamente.
- [x] Meta tags de SEO/Open Graph em ambas as páginas (`title`,
      `description`, `og:title`, `og:description`, `og:type`,
      `og:locale`). `og:image` fica **pendente** — não faz sentido antes
      de existirem fotos reais e um domínio público (ADR-0006).
- [ ] Testar responsividade em 375px / 768px / 1440px — registrar
      screenshots em `docs/evidence/`. **Não executado nesta sessão**:
      exige um navegador real e este projeto não usa Playwright/Chromium
      (ver CLAUDE.md). Revisão de código confirma breakpoints mobile-first
      em `layout.css` (640px/768px/1024px), mas isso não substitui olhar a
      tela de verdade — pendente de verificação manual pelo usuário.
- [ ] Rodar Lighthouse (mobile) em `index.html` e `catalogo.html` —
      registrar resultado em `docs/evidence/`. **Não executado nesta
      sessão** pelo mesmo motivo (Lighthouse depende de Chrome/Chromium).
      Pendente de execução manual pelo usuário (ex.: aba Lighthouse do
      Chrome DevTools).

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
