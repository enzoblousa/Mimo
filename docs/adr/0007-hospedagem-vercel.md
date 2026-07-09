# ADR-0007: Hospedagem real passa a ser Vercel, não GitHub Pages

- Status: Aceito
- Data: 2026-07-09

## Contexto

[ADR-0005](0005-hospedagem-estatica.md) decidiu GitHub Pages como
hospedagem, rejeitando explicitamente Vercel/Netlify por evitarem "mais
uma conta/serviço externo". [ADR-0006](0006-placeholder-e-deploy-adiado.md)
adiou qualquer deploy público até haver fotos reais das peças.

Na prática, o usuário já fez o primeiro deploy público em
**Vercel** (`mimmopecas.vercel.app`), sem passar pelo checklist de saída
do ADR-0006 nem pela configuração de GitHub Pages prevista no ADR-0005.
Este ADR existe para que a documentação reflita a realidade em produção,
em vez de descrever uma hospedagem que não é a que está de fato no ar.

## Decisão

1. A hospedagem real do site é **Vercel** (`mimmopecas.vercel.app`), não
   GitHub Pages. ADR-0005 fica superada nesse ponto — GitHub Pages deixa
   de ser a hospedagem-alvo.
2. Deploy continua sendo "sem build step": Vercel serve os arquivos
   estáticos do repositório diretamente (mesma stack do ADR-0002), sem
   etapa de build própria.
3. `docs/tasks/TASKS.md` Fase 5 é atualizada para refletir Vercel em vez
   de "Configurar GitHub Pages".

## Consequências

- Ganha-se preview deploys automáticos por PR/branch (recurso da Vercel
  que o ADR-0005 tinha descartado como desnecessário) — pode ser útil
  para revisar mudanças antes de ir para produção.
- Perde-se a simplicidade de "só GitHub, sem outra conta" que motivava o
  ADR-0005 original — agora há uma conta/serviço externo adicional a
  manter.
- **O deploy foi feito antes do checklist de saída do ADR-0006 ser
  cumprido** — as imagens em produção ainda são placeholders de
  terceiros, não fotos reais das peças da Flávia. O usuário decidiu
  explicitamente (2026-07-09) manter o site no ar mesmo assim e tratar a
  troca de imagens depois — ver nota adicionada em ADR-0006. Isso não é
  revertido por este ADR; é um risco aceito separadamente.
- Domínio próprio, se a loja quiser um no futuro, passa a ser configurado
  na Vercel em vez de via CNAME do GitHub Pages.

## Alternativas consideradas

- **Reverter para GitHub Pages conforme ADR-0005**: rejeitado por agora —
  o site já está no ar em Vercel e funcionando; migrar de novo sem motivo
  concreto seria retrabalho sem benefício.
