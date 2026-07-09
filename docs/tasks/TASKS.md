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

- [x] ~~Estrutura semântica de `index.html` (header, hero, sobre, destaques,
      footer).~~ Estrutura atual (pós Fase 4.6/4.11): header, hero,
      catálogo completo, footer — "sobre" mudou para `sobre.html` (Fase
      4.11), destaques removidos, ver abaixo.
- [x] ~~Hero com nome da loja, posicionamento e CTA "Ver catálogo".~~ CTA
      removido na Fase 4.6 — catálogo já está na mesma página. Hero ganhou
      de volta um segundo CTA na Fase 4.11 ("Conhecer a Flávia" →
      `sobre.html`).
- [x] ~~Seção "Sobre" lendo texto de `config.json`~~ — documentada como
      **removida da home em 2026-07-08** (Fase 4.5, SPEC-0002 RF-02), mas
      na prática só saiu de `index.html` na **Fase 4.11 (2026-07-09)**,
      quando foi movida para `sobre.html` (não apagada). Texto continua em
      `config.json`, agora renderizado em `sobre.html`.
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
- [x] ~~`assets/js/filtro.js`: filtro por categoria (derivado dos dados) +
      busca textual, combináveis.~~ Filtro por categoria removido por
      completo na Fase 4.14 — `filtro.js` hoje só faz busca textual.
- [x] Estado vazio ("nenhuma peça encontrada") para busca sem resultado e
      para catálogo vazio (`catalogo.html` + `catalogo.js`).
- [x] ~~Selos de `status` (pronta entrega / sob encomenda / vendida) e
      esmaecimento apenas visual para `status: "vendida"`.~~ **Removido
      totalmente em 2026-07-08** (decisão do usuário) — ver Fase 4.7 e
      Fase 4.10 (correção: a remoção de código só foi de fato concluída em
      4.10).
- [x] ~~`assets/js/modal.js`: `<dialog>` nativo com galeria (miniaturas),
      descrição, medidas/técnica (linhas ocultas se ausentes), preço, selo
      de status e deep-link via `#slug` (evento `hashchange`).~~ Selo
      removido na Fase 4.10; demais itens continuam.
- [x] ~~`catalogo.html`: filtros dinâmicos, busca, grade e modal
      integrados.~~ Migrado para `index.html` na Fase 4.6 (catalogo.html
      não existe mais).

## Fase 3 — Contato e conversão (SPEC-0003)

- [x] ~~`assets/js/contato.js`: gera link `wa.me` com mensagem pré-preenchida
      por peça (varia por `status`), a partir de `nome` + `config.json`;
      retorna `null` (sem CTA) para peça `vendida`.~~ Simplificado na
      Fase 4.7: mensagem única, sempre retorna link.
- [x] Links de contato geral (WhatsApp, Instagram) no header/footer, lidos
      de `config.json` (feito na Fase 1, presente em `index.html` — única
      página desde a Fase 4.6).
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
- [x] ~~`scripts/validar-produtos.js`: script Node puro (sem dependências)
      validando campos obrigatórios, tipos, enums (`tipo`/`status`) e
      unicidade de `slug`.~~ Validação de `status` removida na Fase 4.10
      (campo não existe mais). Testado com dados válidos (10/10 OK) e com 3
      erros propositais (campo faltando, enum inválido, slug duplicado) —
      pegou os 3 corretamente.
- [x] Meta tags de SEO/Open Graph (`title`, `description`, `og:title`,
      `og:description`, `og:type`, `og:locale`) — hoje só em `index.html`,
      única página do site desde a Fase 4.6. `og:image` fica **pendente** —
      não faz sentido antes de existirem fotos reais e um domínio público
      (ADR-0006).
- [ ] Testar responsividade em 375px / 768px / 1440px — registrar
      screenshots em `docs/evidence/`. **Não executado nesta sessão**:
      exige um navegador real e este projeto não usa Playwright/Chromium
      (ver CLAUDE.md). Revisão de código confirma breakpoints mobile-first
      em `layout.css` (640px/768px/1024px), mas isso não substitui olhar a
      tela de verdade — pendente de verificação manual pelo usuário.
- [ ] Rodar Lighthouse (mobile) em `index.html` — registrar resultado em
      `docs/evidence/`. **Não executado nesta sessão** (Lighthouse depende
      de Chrome/Chromium). Pendente de execução manual pelo usuário (ex.:
      aba Lighthouse do Chrome DevTools).

## Fase 4.5 — Redesign visual delicado (spec 2026-07-08)

Ver `docs/superpowers/specs/2026-07-08-redesign-visual-delicado-design.md`.

- [x] ~~Trocar fonte display de Fraunces para Jost, pesos mais leves
      (`h1`/`h2`/`h3`, `.logo`, `.tag-preco`).~~ **Correção (2026-07-09)**:
      nunca foi executado — `--fonte-display` continuou `"Fraunces"` até
      hoje (mesmo padrão de mismatch da paleta floral, Fase 4.8 vs. 4.13).
      Implementado de verdade na Fase 4.16.
- [ ] ~~Reduzir intensidade de `--raio-organico`, `--rotacao-tag` e
      sombras.~~ Também nunca foi executado — `--raio-organico` continua
      `4px 32px 4px 32px` (não `10px 14px 10px 16px` como documentado) e
      a rotação da tag de preço continua `-3deg`. Não corrigido nesta
      sessão (fora do escopo pedido — só a fonte foi solicitada).
- [x] Aumentar espaçamento do grid de produtos (`gap`) e padding interno
      do card.
- [x] Atualizar `docs/design/DESIGN.md` §4 com os novos valores.
- [x] ~~Remover seção "Sobre" da página inicial (decisão do usuário,
      2026-07-08) — `index.html`, `catalogo.html` (link de nav),
      `assets/js/inicio.js` (`preencherSobre`), `assets/css/layout.css`
      (`.sobre`/`.sobre__conteudo`), SPEC-0002 RF-02 atualizados.~~
      **Correção (2026-07-09)**: este item foi marcado concluído nesta
      fase, mas nunca foi executado de fato — a seção `<section
      class="sobre">`, `preencherSobre` e o link `#sobre` continuaram em
      `index.html`/`inicio.js`/`config.js` até serem finalmente movidos
      para `sobre.html` na Fase 4.11.

> **Verificação parcial**: CSS servindo 200 via `curl` num servidor
> estático local, diffs revisados manualmente. **Não verificado
> visualmente num navegador** — sem Playwright/Chromium neste projeto (ver
> CLAUDE.md). Pendente: usuário abrir `index.html` e `catalogo.html`
> localmente e confirmar que a fonte Jost carregou, os cantos/rotação
> ficaram sutis e o espaçamento do grid ficou mais respirado.

## Fase 4.6 — Catálogo completo na página inicial (2026-07-08)

Decisão do usuário: eliminar a página `catalogo.html` separada — o
catálogo completo (filtro, busca, grade, modal) passa a morar direto em
`index.html`, logo abaixo do hero, sem botão "Ver catálogo" (não há mais
para onde navegar). Ver SPEC-0001, SPEC-0002 (RF-01/RF-03/RF-04
atualizados) e `docs/design/DESIGN.md` §1/§3/§5.

- [x] Remover botão "Ver catálogo" do hero (`index.html`).
- [x] Remover seção "Destaques" (redundante com o catálogo completo
      logo abaixo) — `index.html`, `assets/js/inicio.js`
      (`renderizarDestaques` removida), SPEC-0002 RF-04 marcado como
      removido.
- [x] Mover filtro/busca/grade/modal de `catalogo.html` +
      `assets/js/catalogo.js` para dentro de `index.html` +
      `assets/js/inicio.js`.
- [x] Apagar `catalogo.html` e `assets/js/catalogo.js`.
- [x] Atualizar `assets/js/produtos.js`: link do card de
      `catalogo.html#slug` para `#slug` (mesma página).
- [x] Nav "Catálogo" vira link âncora `#catalogo` (mesma página).
- [x] Atualizar `docs/design/DESIGN.md` (§1 estrutura de arquivos, §3 fluxo
      de navegação, §5 deep-link) e `docs/specs/0002-pagina-inicial.md`.

> **Verificação parcial**: `node --check` em todos os `.js`, sintaxe OK;
> `node scripts/validar-produtos.js` OK (10/10); `index.html` e os assets
> retornam 200 num servidor estático local. **Não verificado visualmente**
> — sem Playwright/Chromium neste projeto (ver CLAUDE.md). Pendente:
> usuário abrir `index.html`, testar filtro/busca, abrir um card (deep-link
> `#slug` deve abrir o modal), Esc/clique fora para fechar.

## Fase 4.7 — Remover rótulo de status por completo (2026-07-08)

Decisão do usuário: nenhuma peça mostra mais selo/rótulo de `status`
(pronta entrega / sob encomenda / vendida), nem esmaecimento visual, nem
variação do CTA de contato — toda peça fica visualmente igual e sempre com
botão "Perguntar sobre esta peça". O campo `status` permanece em
`data/produtos.json` (schema/validação não mudaram), só deixou de ser lido
pela UI. Ver SPEC-0001 RF-01, SPEC-0003 RF-01, `docs/design/DESIGN.md` §2/§4.

- [x] ~~`assets/js/produtos.js`: remover `ROTULO_STATUS`, criação do selo e
      `card-produto--vendida` em `criarCardProduto`.~~ **Correção
      (2026-07-09)**: este item foi marcado concluído nesta fase, mas o
      código não tinha sido de fato alterado — `produtos.js` ainda criava o
      selo. Executado de verdade na Fase 4.10.
- [x] ~~`assets/js/modal.js`: remover leitura de `ROTULO_STATUS`/selo em
      `abrirModal`; simplificar `preencherContato` (botão sempre visível).~~
      Mesma correção — feito de verdade na Fase 4.10.
- [x] `assets/js/contato.js`: `linkContatoProduto` vira mensagem única,
      sempre retorna link (nunca `null`). (Este item foi implementado
      corretamente nesta fase.)
- [x] ~~`index.html`: remover `<span data-modal-selo>` do modal.~~ Feito de
      verdade na Fase 4.10.
- [x] ~~`assets/css/componentes.css`: remover `.selo*`, `.card-produto--vendida`
      e o `position: relative` que só existia para posicionar o selo.~~
      Feito de verdade na Fase 4.10.
- [x] Atualizar SPEC-0001, SPEC-0003, `DESIGN.md` (§2, §4) e este arquivo.

> **Verificação parcial**: `node --check` em todos os `.js`, sintaxe OK;
> `node scripts/validar-produtos.js` OK (10/10, schema/validador não
> mudaram); `index.html` retorna 200 num servidor estático local. **Não
> verificado visualmente** — sem Playwright/Chromium neste projeto (ver
> CLAUDE.md).
>
> **Nota de correção (2026-07-09)**: a verificação acima checou sintaxe e
> HTTP 200, não o conteúdo — por isso não pegou que o selo continuava
> sendo criado em `produtos.js`/`modal.js` e o markup/CSS não tinham sido
> removidos, apesar dos itens acima estarem marcados `[x]`. Corrigido na
> Fase 4.10, que também removeu o campo `status` do schema.

## Fase 4.8 — Paleta floral (2026-07-08)

Decisão do usuário: trocar a paleta pastel (rosa claro + vermelho suave)
por uma paleta extraída de `imagens/foto-flores-exemplo-cores-usar.png`
(buquê com rosa/magenta, laranja, dourado, verde, azul). Fundo geral e
header/hero ganham um gradiente floral de 5 tons pastéis; cards continuam
neutros.

> **Correção (2026-07-09)**: nenhum item abaixo tinha sido de fato
> implementado — `assets/css/base.css` continuou com os tokens terracota
> da Fase 0 (mesmo padrão de itens marcados `[x]` sem código
> correspondente já visto nas Fases 4.5 e 4.7). A paleta floral nunca
> chegou a existir em código; foi substituída diretamente pela paleta em
> tons de rosa da Fase 4.13, sem passar por uma implementação real desta
> fase.

- [ ] ~~`assets/css/base.css`: novos valores de `--cor-primaria`,
      `--cor-acento`, `--cor-acento-escuro`, `--cor-texto-suave`; novos
      tokens `--cor-flor-*` e `--gradiente-floral`; `body` usa o
      gradiente.~~ Nunca implementado — ver correção acima.
- [ ] ~~`assets/css/layout.css`: `.cabecalho` e `.nav` (mobile) com fundo
      sólido `--cor-flor-rosa`; `.hero` com o gradiente floral.~~ Nunca
      implementado.
- [ ] ~~Verificação de contraste WCAG AA de todos os pares novos (acento
      sobre os 5 tons do gradiente, texto-suave sobre os 5 tons,
      primária) — todos ≥ 4.5:1, documentado em `DESIGN.md` §4.~~ A
      verificação foi feita sobre tokens que nunca chegaram ao CSS.
- [x] Atualizar `docs/design/DESIGN.md` §4 (isso de fato aconteceu — só o
      código que não seguiu).

## Fase 4.9 — Polimento de acabamento (2026-07-08)

Decisão do usuário (via skill frontend-design): refinar a execução dentro
da identidade já aprovada (paleta floral, Jost, formas orgânicas sutis),
sem trocar fonte/paleta/estrutura. Só CSS (+ nenhuma mudança de JS).

> **Correção (2026-07-09)**: como a paleta floral da Fase 4.8 nunca existiu
> em código, as referências a "`--gradiente-floral` do `body`" e "`.hero`
> herda o gradiente do body" abaixo também nunca corresponderam à
> realidade — `body` e `.hero` sempre usaram cor sólida (`--cor-fundo`),
> nunca gradiente. A textura de grão (`--textura-grao`) é real e continua
> em uso, agora sobre a paleta rosa (Fase 4.13).

- [x] Entrada com fade/subida escalonada no hero (`.hero__conteudo > *`) e
      nos cards do catálogo (`.card-produto:nth-child`), via
      `@keyframes entrar-suave` em `base.css` — respeita
      `prefers-reduced-motion` (regra global já existente).
- [x] Textura de grão (`--textura-grao`, SVG `feTurbulence` inline) sobre
      `--cor-fundo` do `body` (não sobre um gradiente — ver correção
      acima).
- [ ] ~~`.hero` deixou de ter gradiente próprio (evitava uma costura de cor
      contra o gradiente do `body`) — agora herda o do body e só soma um
      brilho radial sutil no topo.~~ Nunca existiu gradiente em nenhum dos
      dois; `.hero` usa cor sólida herdada do `body` desde sempre.
- [x] Zoom sutil na foto do card ao passar o mouse
      (`.card-produto:hover .card-produto__figura img`).
- [x] Modal (`<dialog>`) com entrada/saída animada via `@starting-style` +
      `transition-behavior: allow-discrete` (degrada bem em navegadores
      sem suporte — só deixa de animar). Botão de fechar redesenhado:
      círculo rosa pastel em vez do "×" flutuante genérico.
- [x] Filtros com transição suave de cor/borda e indicador "✓" no item
      ativo.
- [x] Divisor orgânico (traço fino, não uma onda genérica) entre hero e
      catálogo — `.divisor-organico` em `index.html`.

> **Verificação parcial**: CSS com chaves balanceadas (contagem manual),
> `index.html`/CSS servindo 200 num servidor estático local. **Não
> verificado visualmente** — sem Playwright/Chromium neste projeto (ver
> CLAUDE.md). Pendente: usuário abrir `index.html` num navegador e
> confirmar as animações de entrada, o zoom no hover do card, a abertura/
> fechamento do modal e o divisor entre hero e catálogo.

## Fase 4.10 — Remover campo `status` do schema por completo (2026-07-09)

Decisão do usuário: ir além da Fase 4.7 (que só tinha removido a *leitura*
do `status` na UI, e cujos itens de código nem isso tinham feito de fato —
ver correção acima) e eliminar o campo inteiramente. `status` não existe
mais em `data/produtos.json`, na validação, no código, nem é mencionado
como conceito ativo na documentação.

- [x] `assets/js/produtos.js`: removido `ROTULOS_STATUS`, `rotuloStatus` e a
      criação do `<span class="selo">` em `criarCardProduto`.
- [x] `assets/js/modal.js`: removida a leitura de `rotuloStatus`/`selo` em
      `preencherGaleria` e o import correspondente.
- [x] `index.html`: removido `<span class="selo" data-modal-selo>` do
      modal.
- [x] `assets/css/componentes.css`: removidos `.selo`, `.selo--disponivel`,
      `.selo--sob-encomenda`, `.selo--vendida`,
      `.card-produto:has(.selo--vendida) ...`, `.modal-produto__corpo .selo`
      e o `position: relative` de `.card-produto__figura` (só existia para
      posicionar o selo). Variável `--rotacao-selo` renomeada para
      `--rotacao-tag-preco` em `base.css` (era usada por `.tag-preco`, não
      pelo selo — nome antigo era resquício de quando os dois
      compartilhavam o token).
- [x] `data/produtos.json`: removido o campo `status` das 10 peças.
- [x] `scripts/validar-produtos.js`: removidos `STATUS_VALIDOS` e a
      validação do campo `status`.
- [x] Atualizar PRD §4, SPEC-0001 RF-01, SPEC-0003 RF-01, `DESIGN.md`
      (§1, §2, §4) e este arquivo.

> **Verificação**: `node --check --input-type=module` em `produtos.js` e
> `modal.js` (sintaxe OK); `node scripts/validar-produtos.js` OK (10/10,
> sem `status`); `index.html`, `data/produtos.json`,
> `assets/css/componentes.css`, `assets/css/base.css`, `produtos.js` e
> `modal.js` retornam 200 num servidor estático local; busca por
> `selo|rotuloStatus|ROTULOS_STATUS|rotacao-selo` em `assets/` e por
> `"status"` em `data/produtos.json` não retorna nenhum resultado. **Não
> verificado visualmente num navegador** — sem Playwright/Chromium neste
> projeto (ver CLAUDE.md). Pendente: usuário abrir um card e o modal no
> navegador e confirmar que não há nenhum selo/rótulo em lugar nenhum (não
> há mais dado de status para testar, já que o campo não existe).

## Fase 4.11 — Mover "Sobre" para página separada (2026-07-09)

Decisão do usuário: a seção "Sobre" sai de `index.html` e passa a viver em
`sobre.html`, uma página nova. A Fase 4.5 já tinha marcado essa remoção
como concluída, mas — assim como o selo de `status` (Fase 4.7 → 4.10) — o
código nunca tinha sido de fato alterado; a seção continuava presente na
home. Esta fase corrige isso e, ao mesmo tempo, dá à seção um lar
definitivo em vez de apagá-la. Ver SPEC-0002 RF-02.

- [x] Criar `sobre.html`: mesmo header/nav e rodapé de `index.html`,
      seção `.sobre` com `data-nome-loja`, `data-sobre-texto` e assinatura,
      meta tags de SEO/Open Graph próprias.
- [x] Criar `assets/js/menu.js` com `ativarMenuMobile()`, extraído de
      `inicio.js` para ser reaproveitado por `sobre.html` sem duplicar
      código.
- [x] Criar `assets/js/sobre.js`: bootstrap de `sobre.html` (menu mobile,
      identidade, contato, texto "sobre").
- [x] `index.html`: removida a `<section class="sobre" id="sobre">` e um
      dos dois `.divisor-argila` (sobrava um, entre hero e catálogo). Link
      "Sobre" do header e CTA "Conhecer a Flávia" do hero agora apontam
      para `sobre.html` (antes eram âncoras `#sobre` mortas, já que a
      seção nunca tinha sido removida de fato).
- [x] `assets/js/inicio.js`: removida a chamada a `preencherSobre` (não há
      mais `[data-sobre-texto]` em `index.html`) e a definição local de
      `ativarMenuMobile`, substituída pelo import de `menu.js`.
- [x] Atualizar SPEC-0002 (RF-01, RF-02, RF-03, critérios de aceite),
      `DESIGN.md` (§1 estrutura de arquivos, §3 fluxo de navegação) e este
      arquivo.

> **Verificação**: `node --check --input-type=module` em `inicio.js`,
> `sobre.js` e `menu.js` (sintaxe OK); `node scripts/validar-produtos.js`
> OK (10/10, sem relação com esta mudança); `index.html`, `sobre.html`,
> `assets/js/inicio.js`, `assets/js/sobre.js`, `assets/js/menu.js` e
> `data/config.json` retornam 200 num servidor estático local; busca por
> "sobre" em `index.html`/`inicio.js` só encontra os links de navegação
> para `sobre.html` (nenhum resquício da seção antiga). **Não verificado
> visualmente num navegador** — sem Playwright/Chromium neste projeto (ver
> CLAUDE.md). Pendente: usuário abrir `sobre.html` e conferir que o texto
> carrega, o painel (`.sobre` com `border-block`) não fica estranho logo
> abaixo do header sem hero acima, e que a navegação de ida e volta entre
> `index.html` e `sobre.html` funciona em desktop e mobile.

## Fase 4.12 — Remover WhatsApp, deixar só Instagram (2026-07-09)

Decisão do usuário: reabre o ADR-0004 (que definia WhatsApp + Instagram) —
WhatsApp deixa de ser canal de contato do site por completo. Instagram é o
único canal, tanto no CTA por peça quanto nos links gerais de header/rodapé.
Ver ADR-0004 (revisado), SPEC-0003 (reescrito).

- [x] `data/config.json`: removido o campo `whatsapp`; ajustado o texto de
      `sobre` (mencionava "chamar no WhatsApp") para "chamar no Instagram".
- [x] `assets/js/config.js`: `preencherContato` não lê mais
      `[data-link-whatsapp]`.
- [x] `assets/js/contato.js`: `linkContatoProduto(config)` passa a
      simplesmente retornar `config.instagram` (perdeu o parâmetro
      `produto`, que só existia para montar a mensagem `wa.me`).
- [x] `assets/js/modal.js`: `preencherContato` chama `linkContatoProduto`
      só com `config`.
- [x] `index.html`, `sobre.html`: removido o link/`data-link-whatsapp` do
      header e do rodapé. Botão do modal renomeado de "Perguntar sobre esta
      peça" para "Perguntar no Instagram" (reflete o destino real do link).
- [x] Atualizado ADR-0004 (decisão revisada, histórico preservado),
      ADR-0001 (referência a "WhatsApp/Instagram"), PRD §1/§5/§6/§10,
      `DESIGN.md` (§1, §2, §3), SPEC-0002 RF-03, SPEC-0003 (reescrito),
      `docs/evidence/README.md`, `CLAUDE.md` e este arquivo.

> **Verificação**: `node --check --input-type=module` em `contato.js`,
> `modal.js`, `config.js` (sintaxe OK); `data/config.json` continua JSON
> válido; `index.html`, `sobre.html` e os `.js` tocados retornam 200 num
> servidor estático local; busca por `whatsapp`/`wa\.me` (case-insensitive)
> em arquivos `.html`/`.js`/`.json` não retorna nenhum resultado. **Não
> verificado visualmente num navegador** — sem Playwright/Chromium neste
> projeto (ver CLAUDE.md). Pendente: usuário abrir o site, clicar em
> "Perguntar no Instagram" num card e confirmar que abre o perfil correto
> em nova aba, e conferir que não sobrou nenhum resquício visual de
> WhatsApp (ex. espaçamento do header/rodapé após remover o link).

## Fase 4.13 — Paleta em tons de rosa (2026-07-09)

Decisão do usuário: substituir toda a paleta de cor (ainda terracota da
Fase 0, apesar da Fase 4.8 nunca ter mudado isso de fato) por tons de
rosa. Diferente da paleta "floral" documentada e nunca implementada na
Fase 4.8, esta é uma paleta monocromática (família rosa/vinho), e desta
vez **implementada de verdade** nos três arquivos CSS, não só documentada.

- [x] `assets/css/base.css`: novos valores para todos os tokens de cor
      (`--cor-fundo`, `--cor-fundo-painel`, `--cor-superficie`,
      `--cor-primaria`, `--cor-acento`, `--cor-acento-escuro`,
      `--cor-texto`, `--cor-texto-suave`, `--cor-borda`, `--cor-escuro`,
      `--cor-escuro-texto`, `--cor-escuro-borda`); novo token
      `--cor-rosa-secundaria` (substitui `--cor-oliva`); `--cor-mostarda`
      (nunca usado) removido; `--textura-grao` (matriz de cor do
      `feColorMatrix`) e `--sombra-suave`/`--sombra-elevada` recalculados
      para o novo `--cor-texto`.
- [x] `assets/css/layout.css`: `.cabecalho` (fundo translúcido),
      `.rodape__conteudo` (texto), `.divisor-argila` (SVG inline) e
      `.hero__disco--interno` (usava `--cor-oliva`, agora
      `--cor-rosa-secundaria`) com os novos valores.
- [x] `assets/css/componentes.css`: `.filtro-item:hover` e
      `.modal-produto::backdrop` (rgba hardcoded, espelhavam tokens
      antigos) atualizados para os novos tokens.
- [x] Verificação de contraste WCAG AA (fórmula de luminância relativa,
      script Node ad-hoc) de todos os pares texto/fundo e acento/fundo
      relevantes — todos ≥ 4.5:1 (4.67:1 a 15.3:1), sem necessidade de
      ajustar nenhum tom. Documentado em `DESIGN.md` §4.
- [x] Atualizado `docs/design/DESIGN.md` §4 (tabela de cor e nota de
      contraste), corrigindo também o histórico das Fases 4.8/4.9 (ver
      correções acima neste arquivo).

> **Verificação**: busca por `#[0-9A-Fa-f]{6}` e `rgba?\(` em
> `assets/css/*.css` confirma que não sobrou nenhuma cor terracota
> hardcoded nem referência a `--cor-oliva`/`--cor-mostarda`; CSS servindo
> 200 num servidor estático local. **Não verificado visualmente num
> navegador** — sem Playwright/Chromium neste projeto (ver CLAUDE.md).
> Pendente: usuário abrir `index.html`/`sobre.html` e confirmar que a
> paleta rosa aparece corretamente (fundo, header, hero, cards, rodapé,
> modal) e que nada ficou ilegível.

## Fase 4.14 — Remover categorias e toda a lógica de filtro (2026-07-09)

Decisão do usuário: o catálogo deixa de ter categorias — nem campo de
dado, nem filtro, nem exibição no card/modal. Só resta a busca textual
(SPEC-0001 RF-03). Ver SPEC-0001 RF-02 (removido).

- [x] `data/produtos.json`: removido o campo `categoria` das 10 peças.
- [x] `scripts/validar-produtos.js`: `categoria` removido de
      `CAMPOS_STRING_OBRIGATORIOS`.
- [x] `assets/js/filtro.js`: removida `categoriasUnicas`; `filtrarProdutos`
      simplificada para receber só a string de busca (perdeu o parâmetro
      `categoria`/objeto de estado).
- [x] `assets/js/inicio.js`: `configurarFiltros` virou `configurarBusca` —
      não gera mais botões de categoria, só liga o campo de busca.
- [x] `assets/js/produtos.js`: removido o `<p class="card-produto__categoria">`
      de `criarCardProduto`.
- [x] `assets/js/modal.js`: removida a linha que preenchia
      `[data-modal-categoria]`.
- [x] `index.html`: removidos `<div class="filtros__lista" data-lista-filtros>`
      e `<p class="modal-produto__categoria" data-modal-categoria>`.
- [x] `assets/css/componentes.css`: removidos `.card-produto__categoria`,
      `.filtros__lista`, `.filtro-item`, `.filtro-item:hover`,
      `.filtro-item[aria-pressed="true"]` e `.modal-produto__categoria`;
      `.filtros` perdeu `justify-content: space-between` (só sobrou o
      campo de busca, não há mais o que espaçar).
- [x] Atualizado SPEC-0001 (RF-01, RF-02 removido, critérios de aceite),
      `DESIGN.md` (§1, §2, §5), `PRD.md` §4 e este arquivo.

> **Verificação**: `node --check --input-type=module` em `filtro.js`,
> `inicio.js`, `produtos.js`, `modal.js` (sintaxe OK); `node
> scripts/validar-produtos.js` OK (10/10, sem `categoria`); chaves de
> `componentes.css` balanceadas (contagem manual); `index.html`,
> `sobre.html`, `data/produtos.json` e os arquivos tocados retornam 200 num
> servidor estático local; busca por
> `categoria|filtro-item|filtros__lista|lista-filtros|categoriasUnicas`
> (case-insensitive) em `.html`/`.js`/`.css`/`.json` não retorna nenhum
> resultado. **Não verificado visualmente num navegador** — sem
> Playwright/Chromium neste projeto (ver CLAUDE.md). Pendente: usuário
> abrir `index.html` e confirmar que a busca continua funcionando e que a
> barra acima da grade não ficou com espaçamento estranho sem os botões de
> categoria.

## Fase 4.15 — Simplificar preço no card (2026-07-09)

Decisão do usuário: o preço no card do catálogo deixa de usar o carimbo
circular tracejado com rotação — vira só o número em destaque, sem
moldura. O modal de detalhe mantém o carimbo circular (não foi pedido para
mudar lá).

- [x] `assets/css/componentes.css`: nova regra `.card-produto__corpo
      .tag-preco` (maior especificidade que `.tag-preco`) zera
      borda/border-radius/dimensões fixas/rotação e usa
      `--fonte-display` em peso 500, tamanho `--texto-lg`. `.tag-preco`
      base (usada pelo modal) não mudou.
- [x] `.card-produto__corpo`: `align-items` de `flex-start` para `center`
      — com o preço não sendo mais um círculo de 4.25rem, o alinhamento
      centralizado com o nome fica mais equilibrado.
- [x] Atualizado `docs/design/DESIGN.md` §4 (nota de etiqueta de preço,
      corrigindo também o nome da variável — a versão anterior citava
      `--rotacao-tag`, que nunca existiu; a real é
      `--rotacao-tag-preco`).

> **Verificação**: chaves de `componentes.css` balanceadas (contagem
> manual); `index.html`/`componentes.css` servindo 200 num servidor
> estático local. **Não verificado visualmente num navegador** — sem
> Playwright/Chromium neste projeto (ver CLAUDE.md). Pendente: usuário
> abrir `index.html` e conferir que o preço nos cards aparece simples
> (sem círculo) e que o modal de detalhe continua com o carimbo circular.

## Fase 4.16 — Fonte display Jost, de verdade (2026-07-09)

Decisão do usuário: trocar a fonte do nome da loja ("Mimmo"), nomes de
produto e preços por algo "mais soft, leve e vibes". Isso já tinha sido
decidido e documentado na Fase 4.5 (trocar Fraunces por Jost), mas nunca
chegou a ser implementado no CSS — confirmado ao ler `base.css` antes de
mexer. Implementado agora de verdade.

- [x] `assets/css/base.css`: `@import` do Google Fonts trocado de
      `Fraunces` para `Jost` (pesos 300/400/500/600, itálico 400/500);
      `--fonte-display` trocado de `"Fraunces", "Iowan Old Style", Georgia,
      serif` para `"Jost", "Century Gothic", sans-serif`. `--fonte-corpo`
      (Work Sans) não mudou — não foi pedido.
- [x] Nenhuma mudança em `layout.css`/`componentes.css` foi necessária —
      `.logo`, `h1`/`h2`/`h3` (nome de produto no card e no modal) e
      `.tag-preco` (preço) já consomem `var(--fonte-display)`, então
      herdam a troca automaticamente.
- [x] Atualizado `docs/design/DESIGN.md` §4 (Tipografia): corrigida a
      descrição para bater com o que está de fato implementado agora
      (incluindo o fallback real, `Century Gothic`, e a correção do corpo
      de texto, que sempre foi Work Sans e nunca Nunito Sans como
      documentado antes).
- [x] Corrigido o item da Fase 4.5 que marcava essa troca como concluída
      sem nunca ter sido feita (ver acima).

> **Verificação**: chaves de `base.css` balanceadas (contagem manual);
> `index.html`/`sobre.html`/`base.css` retornam 200 num servidor estático
> local; URL do Google Fonts para Jost responde 200; busca por
> `Fraunces` em `assets/` não retorna nenhum resultado. **Não verificado
> visualmente num navegador** — sem Playwright/Chromium neste projeto
> (ver CLAUDE.md). Pendente: usuário abrir o site e confirmar que a fonte
> carregou (Jost, não o fallback) no nome da loja, nomes de peça e preços,
> incluindo os pesos itálicos (`.logo`, texto de "nenhuma peça encontrada",
> título do modal).

## Fase 4.17 — Afinar peso da fonte Jost (2026-07-09)

Decisão do usuário: a Jost recém-trocada (Fase 4.16) estava "muito
grossa" — nenhum uso chegava a `font-weight: 700` (negrito de verdade),
mas os pesos liam pesado demais para o efeito "soft/leve" pretendido.
Reduzido em duas rodadas (usuário pediu "deixe mais fino" depois da
primeira rodada) até os valores finais abaixo.

- [x] `assets/css/base.css`: `@import` do Jost final com os pesos
      realmente usados (`0,200;0,300;0,400;1,200;1,300`); `h1`/`h2`/`h3`
      base 400 → 300 → **200**; `h3` (nome de produto no card) 500 → 400
      → **300**.
- [x] `assets/css/layout.css`: `.logo` 500 → 400 → **300**;
      `.sobre__conteudo .sobre__lead` 400 → 300 → **200**;
      `.sobre__assinatura` ganhou peso explícito (antes caía no padrão do
      navegador) 300 → **200**.
- [x] `assets/css/componentes.css`: `.tag-preco` (preço no modal) 600 →
      500 → **400**; `.card-produto__corpo .tag-preco` (preço no card)
      500 → 400 → **300**; `.catalogo-vazio` ganhou peso explícito 300 →
      **200**.

> **Verificação**: chaves dos três arquivos CSS balanceadas (contagem
> manual); `index.html`/`sobre.html`/CSS servindo 200 num servidor
> estático local; URL do Google Fonts com os pesos finais responde 200.
> **Não verificado visualmente num navegador** — sem Playwright/Chromium
> neste projeto (ver CLAUDE.md). Pendente: usuário abrir o site e
> confirmar que o nome da loja, nomes de peça e preços ficaram
> visivelmente mais finos, sem parecer negrito em lugar nenhum.

## Fase 4.18 — Botão primário com rosa mais claro (2026-07-09)

Decisão do usuário: o rosa do botão preenchido (`.botao--primario` — "Ver
catálogo", "Conhecer a Flávia", "Perguntar no Instagram") ficou mais claro
em repouso. O botão de contorno (`.botao--secundario`) não mudou — o rosa
dele é só borda/texto fino, e usar um tom claro deixaria a borda quase
invisível contra o fundo (contraste calculado ficaria em ~1.65:1, bem
abaixo do mínimo de 3:1 para componentes de UI).

- [x] `assets/css/componentes.css`: `.botao--primario` passa a usar
      `var(--cor-primaria)` (rosa claro) com `var(--cor-texto)` (texto
      escuro) em repouso; no hover, intensifica para `var(--cor-acento)`
      com `var(--cor-superficie)` (texto claro) — mesma combinação de
      antes, agora só no hover.
- [x] Contraste verificado (fórmula de luminância): texto escuro sobre
      rosa claro em repouso = 8.64:1; texto claro sobre acento no hover =
      5.74:1 — ambos acima do mínimo de 4.5:1.

> **Verificação**: chaves de `componentes.css` balanceadas; `index.html`/
> `sobre.html`/CSS servindo 200 num servidor estático local. **Não
> verificado visualmente num navegador** — sem Playwright/Chromium neste
> projeto (ver CLAUDE.md). Pendente: usuário abrir o site e conferir o
> botão em repouso e hover (hero, modal do produto).

## Fase 5 — Deploy (ADR-0005, ADR-0006) — **não-bloqueante por enquanto**

Sem prazo e sem domínio definidos (PRD §8); esta fase fica pendente até
haver decisão de lançar publicamente. Antes de executá-la, checar
obrigatoriamente o item de imagens (ADR-0006):

- [ ] **Pré-requisito**: substituir toda imagem placeholder por foto real
      da peça (ou imagem com licença adequada) — nenhuma foto de terceiro
      "emprestada" pode ir para produção.
- [ ] Configurar GitHub Pages para o repositório.
- [ ] Validar em produção: catálogo carrega, filtro funciona, link do
      Instagram abre correto.
- [ ] Atualizar `docs/evidence/` com prints/links do site em produção.

## Fora de escopo (não fazer sem nova ADR)

- Carrinho de compras, checkout ou pagamento online (ADR-0001).
- Backend, banco de dados ou CMS externo (ADR-0002, ADR-0003).
- Formulário de contato próprio (ADR-0004).
