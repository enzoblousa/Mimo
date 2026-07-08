# TASKS — Mimo Cerâmica

Checklist de implementação derivado de `docs/specs/`. Marcar cada item ao
concluir e anexar evidência correspondente em `docs/evidence/` quando
aplicável (ver `docs/evidence/README.md`).

## Fase 0 — Base do projeto

- [ ] Criar estrutura de pastas conforme `docs/design/DESIGN.md` (§1).
- [ ] Criar `data/config.json` com dados reais da loja (nome, WhatsApp,
      Instagram, texto "sobre").
- [ ] Criar `data/produtos.json` com peças reais (ou dados de exemplo
      realistas caso ainda não haja fotos/textos finais).
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
- [ ] Indicação visual de peça indisponível (esmaecida, sem CTA de
      contato).
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

## Fase 5 — Deploy (ADR-0005)

- [ ] Configurar GitHub Pages para o repositório.
- [ ] Validar em produção: catálogo carrega, filtro funciona, links de
      WhatsApp abrem corretos.
- [ ] Atualizar `docs/evidence/` com prints/links do site em produção.

## Fora de escopo (não fazer sem nova ADR)

- Carrinho de compras, checkout ou pagamento online (ADR-0001).
- Backend, banco de dados ou CMS externo (ADR-0002, ADR-0003).
- Formulário de contato próprio (ADR-0004).
