# TASKS — Mimmo Cerâmica

Checklist de implementação derivado de `docs/specs/`. Marcar cada item ao
concluir e anexar evidência correspondente em `docs/evidence/` quando
aplicável (ver `docs/evidence/README.md`).

## Fase 0 — Base do projeto

- [ ] Criar estrutura de pastas conforme `docs/design/DESIGN.md` (§1).
- [ ] Criar `data/config.json` com dados reais da loja (nome "Mimmo",
      WhatsApp `5561995793905`, Instagram `@flaviamangabeirab`, texto
      "sobre" a escrever — ver PRD §2, §5, §7).
- [ ] Criar `data/produtos.json` com peças de exemplo usando **imagens
      placeholder** (PRD §7, ADR-0006) até existirem fotos reais das
      peças da Flávia. Usar preços na faixa R$ 15-30 (PRD §4) e cobrir os
      dois `tipo` (`unica`, `modelo-repetivel`) e os três `status`
      (`disponivel`, `sob-encomenda`, `vendida`) para testar a UI.
- [ ] Criar `assets/css/base.css` com variáveis de cor/tipografia definidas
      na direção visual (DESIGN.md §4).

## Fase 1 — Página inicial (SPEC-0002)

- [ ] Estrutura semântica de `index.html` (header, hero, sobre, destaques,
      footer).
- [ ] Hero com nome da loja, posicionamento e CTA "Ver catálogo".
- [ ] Seção "Sobre" lendo texto de `config.json`.
- [ ] Seção de destaques renderizando peças com `destaque: true` (ou
      omitida se não houver nenhuma).
- [ ] Header responsivo com menu hambúrguer em mobile.

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
