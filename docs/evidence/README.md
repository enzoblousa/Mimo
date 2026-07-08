# Evidence

Esta pasta guarda as evidências de que os critérios de aceite das specs
(`docs/specs/`) e as tarefas (`docs/tasks/TASKS.md`) foram de fato
verificados — não apenas implementados. Uma tarefa marcada como concluída
sem evidência correspondente (quando a tarefa pede uma) é considerada não
verificada.

## O que registrar

- **Screenshots de responsividade**: `responsividade-<data>-<breakpoint>.png`
  (ex. `responsividade-2026-07-08-375px.png`), cobrindo os breakpoints do
  SPEC-0004.
- **Relatórios Lighthouse**: exportar como `lighthouse-<pagina>-<data>.json`
  ou print do resumo de scores.
- **Checagem de acessibilidade**: notas de navegação manual por teclado,
  print do contraste verificado (ex. via DevTools).
- **Saída do script de validação**: cole a saída de
  `node scripts/validar-produtos.js` ao rodar antes do deploy.
- **Prints do site em produção** após deploy (ADR-0005), mostrando catálogo,
  filtro em uso e um link `wa.me` funcionando.

## Convenção de nome

`<area>-<data-YYYY-MM-DD>-<descricao-curta>.<ext>`

Exemplo: `a11y-2026-07-08-navegacao-teclado.png`

## Por que isso existe

Specs e Tasks descrevem o que deveria ser verdade; Evidence é a prova de que
é. Sem isso, "critério de aceite cumprido" é apenas uma alegação.
