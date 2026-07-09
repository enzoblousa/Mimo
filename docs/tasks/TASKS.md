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
- [x] `assets/js/filtro.js`: filtro por categoria (derivado dos dados) +
      busca textual, combináveis.
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

- [x] Trocar fonte display de Fraunces para Jost, pesos mais leves
      (`h1`/`h2`/`h3`, `.logo`, `.tag-preco`).
- [x] Reduzir intensidade de `--raio-organico`, `--rotacao-tag` e sombras.
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
neutros. Ver `docs/design/DESIGN.md` §4 para a tabela completa de tokens e
a verificação de contraste WCAG AA.

- [x] `assets/css/base.css`: novos valores de `--cor-primaria`,
      `--cor-acento`, `--cor-acento-escuro`, `--cor-texto-suave`; novos
      tokens `--cor-flor-*` e `--gradiente-floral`; `body` usa o gradiente.
- [x] `assets/css/layout.css`: `.cabecalho` e `.nav` (mobile) com fundo
      sólido `--cor-flor-rosa`; `.hero` com o gradiente floral.
- [x] Verificação de contraste WCAG AA de todos os pares novos (acento
      sobre os 5 tons do gradiente, texto-suave sobre os 5 tons, primária)
      — todos ≥ 4.5:1, documentado em `DESIGN.md` §4.
- [x] Atualizar `docs/design/DESIGN.md` §4.

> **Verificação parcial**: contraste calculado via fórmula WCAG (não
> visualmente). CSS servindo 200 num servidor estático local. **Não
> verificado visualmente num navegador** — sem Playwright/Chromium neste
> projeto (ver CLAUDE.md). Pendente: usuário abrir `index.html` e
> confirmar que o gradiente aparece no fundo/header/hero e que os cards
> continuam legíveis.

## Fase 4.9 — Polimento de acabamento (2026-07-08)

Decisão do usuário (via skill frontend-design): refinar a execução dentro
da identidade já aprovada (paleta floral, Jost, formas orgânicas sutis),
sem trocar fonte/paleta/estrutura. Só CSS (+ nenhuma mudança de JS).

- [x] Entrada com fade/subida escalonada no hero (`.hero__conteudo > *`) e
      nos cards do catálogo (`.card-produto:nth-child`), via
      `@keyframes entrar-suave` em `base.css` — respeita
      `prefers-reduced-motion` (regra global já existente).
- [x] Textura de grão (`--textura-grao`, SVG `feTurbulence` inline) sobre o
      `--gradiente-floral` do `body`.
- [x] `.hero` deixou de ter gradiente próprio (evitava uma costura de cor
      contra o gradiente do `body`) — agora herda o do body e só soma um
      brilho radial sutil no topo.
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
