# ADR-0003: Dados dos produtos ficam em JSON local versionado no repositório

- Status: Aceito
- Data: 2026-07-08

## Contexto

Seguindo [ADR-0002](0002-stack-html-css-js-vanilla.md), não há backend nem
build step. Ainda assim precisamos de uma fonte única de verdade para as
peças do catálogo (nome, descrição, preço, categoria, imagens, disponibilidade)
que seja fácil de editar sem conhecimento de programação avançado.

## Decisão

Os dados das peças ficam em `data/produtos.json`, um array de objetos
seguindo o schema definido em `docs/design/DESIGN.md`. O JavaScript do site
faz `fetch('data/produtos.json')` em tempo de execução e renderiza os cards.
Imagens ficam em `assets/imagens/produtos/<slug>.jpg` referenciadas por
caminho relativo no JSON.

Para adicionar/remover/editar uma peça: editar o array em `produtos.json` e
adicionar a imagem correspondente. Nenhum outro arquivo precisa mudar.

## Consequências

- Zero infraestrutura extra (sem CMS, sem banco de dados, sem custo
  recorrente).
- Quem for editar precisa ter cuidado com sintaxe JSON válida (vírgulas,
  aspas). Mitigamos isso com um script simples de validação
  (`scripts/validar-produtos.js`, ver TASKS) rodado antes do deploy.
- Não há interface visual de edição — quem cadastra peças precisa editar
  texto diretamente. Aceitável no estágio atual; se isso virar fricção real
  para o dono da loja, revisitar com um CMS headless (ex.: Decap CMS, que
  funciona sobre Git sem exigir backend próprio).

## Alternativas consideradas

- **CMS headless (Sanity/Contentful)**: adiciona uma conta externa, uma API e
  uma dependência de rede em tempo de build/runtime — desproporcional ao
  volume atual de peças.
- **Banco de dados próprio**: exigiria um backend, contrariando
  [ADR-0002](0002-stack-html-css-js-vanilla.md).
