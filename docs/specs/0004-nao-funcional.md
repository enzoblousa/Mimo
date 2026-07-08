# SPEC-0004: Requisitos Não-Funcionais

- Status: Aceito
- ADRs relacionados: [0002](../adr/0002-stack-html-css-js-vanilla.md),
  [0005](../adr/0005-hospedagem-estatica.md)

## Responsividade

- Layout mobile-first: catálogo funciona em telas a partir de 320px de
  largura sem scroll horizontal.
- Breakpoints sugeridos: mobile (< 640px), tablet (640-1024px), desktop
  (> 1024px). Grade de produtos ajusta número de colunas por breakpoint
  (ex.: 1 / 2 / 3-4 colunas).
- Testar manualmente em pelo menos: 375px (celular), 768px (tablet), 1440px
  (desktop) — registrar evidência em `docs/evidence/`.

## Acessibilidade

- Todo `<img>` tem `alt` descritivo (nome da peça no mínimo).
- Contraste de texto sobre fundo atende WCAG AA (relação mínima 4.5:1 para
  texto normal).
- Elementos interativos (filtros, cards, botões de contato) são navegáveis
  por teclado (`Tab`/`Enter`) e têm `:focus-visible` perceptível.
- Modal de detalhe da peça: foco é preso dentro do modal enquanto aberto
  (focus trap) e `Esc` fecha.

## Performance

- Imagens de produto otimizadas (formato moderno como WebP quando possível,
  com fallback), carregadas com `loading="lazy"` exceto a primeira dobra.
- Sem dependências externas pesadas (sem jQuery, sem framework CSS completo)
  — CSS e JS próprios, minificação opcional antes do deploy.
- Meta de performance: Lighthouse Performance ≥ 90 em mobile para a página
  inicial e o catálogo.

## SEO básico

- `<title>` e `<meta name="description">` únicos e descritivos por página.
- Open Graph tags (`og:title`, `og:image`, `og:description`) para
  compartilhamento em redes sociais.
- Estrutura semântica de HTML (`<header>`, `<main>`, `<nav>`, `<footer>`,
  hierarquia correta de headings).

## Validação de dados

- Script `scripts/validar-produtos.js` (Node, sem dependências externas)
  valida que `data/produtos.json` tem os campos obrigatórios do schema
  (DESIGN.md) antes de cada deploy.

## Critérios de aceite

- [ ] Lighthouse mobile: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95.
- [ ] Navegação completa do site (filtro, abrir peça, clicar em contato)
      funciona apenas com teclado.
- [ ] `scripts/validar-produtos.js` roda sem erro sobre os dados atuais e
      falha de propósito se um campo obrigatório for removido (testar
      manualmente).
