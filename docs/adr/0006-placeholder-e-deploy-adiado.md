# ADR-0006: Imagens placeholder ficam restritas ao ambiente local; deploy público é adiado

- Status: Aceito
- Data: 2026-07-08

## Contexto

Segundo o PRD (`docs/PRD.md` §7 e §8): a loja é um projeto novo, ainda sem
nenhuma foto real das peças da Flávia. Para poder desenvolver e visualizar o
catálogo desde já, o plano é usar imagens de terceiros encontradas na
internet como placeholder. Além disso, não há domínio nem prazo de
lançamento — a fase atual do projeto é rodar **apenas localmente**
(PRD §8), com deploy resolvido depois.

Isso interage com [ADR-0005](0005-hospedagem-estatica.md) (GitHub Pages):
publicar um catálogo com fotos de terceiros associadas à marca Mimmo em um
endereço público (mesmo que seja só um link `github.io`) é um risco de
imagem/direito autoral desnecessário, já que ninguém está pedindo esse
deploy agora.

## Decisão

1. Imagens placeholder de terceiros são permitidas **apenas em ambiente de
   desenvolvimento local**, nunca commitadas/publicadas como se fossem
   fotos reais da loja. Usar imagens claramente substituíveis (ex. um
   serviço de placeholder ou fotos de banco livre de uso comercial, com
   fonte anotada) e marcar visualmente ou em comentário que são
   temporárias.
2. O deploy público via GitHub Pages ([ADR-0005](0005-hospedagem-estatica.md))
   é **adiado**: continua sendo a decisão de hospedagem quando chegar a
   hora, mas deixa de ser bloqueante para o momento atual do projeto.
   `docs/tasks/TASKS.md` Fase 5 reflete isso como não-bloqueante.
3. Antes do primeiro deploy público real, checar explicitamente: todas as
   imagens em `assets/imagens/produtos/` são fotos reais das peças da
   Flávia (ou banco de imagens com licença adequada) — nenhuma foto de
   terceiro "emprestada" sem direito.

## Consequências

- Desenvolvimento não fica bloqueado esperando fotos profissionais.
- Reduz a zero o risco de publicar, mesmo que informalmente, uma imagem de
  outra pessoa associada à marca Mimmo.
- Cria um checklist de saída (item 3) que precisa ser lembrado ativamente
  antes de qualquer deploy — registrado também em TASKS.md Fase 5.

## Alternativas consideradas

- **Deployar já com placeholders**: rejeitado pelo risco de imagem/direito
  autoral levantado acima, sem benefício real já que não há prazo nem
  domínio a justificar pressa.
- **Não usar nenhum placeholder, esperar fotos reais para começar a
  desenvolver**: rejeitado — atrasaria todo o desenvolvimento do
  catálogo/filtro/modal por um motivo (fotos) que não depende do código.
