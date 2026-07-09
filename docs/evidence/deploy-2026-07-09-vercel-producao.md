# Validação do deploy em produção — Vercel (2026-07-09)

URL: https://mimmopecas.vercel.app

## Contexto

Deploy feito pelo usuário fora do fluxo documentado (ver
[ADR-0007](../adr/0007-hospedagem-vercel.md) e a nota em
[ADR-0006](../adr/0006-placeholder-e-deploy-adiado.md) sobre o
pré-requisito de imagens não ter sido cumprido antes do deploy).

## Verificação automatizada (`curl`, sem navegador)

```
GET /                          -> 200
GET /sobre.html                -> 200
GET /data/produtos.json        -> 200
GET /data/config.json          -> 200
GET /assets/css/base.css       -> 200
GET /assets/js/produtos.js     -> 200
```

`data/produtos.json` em produção: 10 produtos, todos com `imagens[0]`
apontando para arquivo existente em `assets/imagens/produtos/`.

`data/config.json` em produção: `instagram` presente e correto
(`https://instagram.com/flaviamangabeirab`).

## Não verificado

Interações reais no navegador (filtro/busca dinâmicos, abrir/fechar
modal, clique no card, link do Instagram abrindo de fato) — não
verificado nesta sessão porque exige navegador real e este projeto não
usa Playwright/Chromium por padrão (ver CLAUDE.md). Pendente: usuário
abrir `mimmopecas.vercel.app` manualmente e confirmar esses fluxos.

## Pendência conhecida

Imagens de produto em produção são placeholders de terceiros, não fotos
reais das peças da Flávia — risco aceito conscientemente pelo usuário em
2026-07-09, ver ADR-0006. Prioridade alta para resolver depois.
