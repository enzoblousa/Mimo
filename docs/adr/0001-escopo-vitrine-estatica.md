# ADR-0001: Escopo é vitrine estática, sem carrinho ou checkout

- Status: Aceito
- Data: 2026-07-08

## Contexto

A Mimmo é uma loja de peças de cerâmica feitas à mão. Precisamos de uma landing
page que funcione como catálogo público das peças disponíveis. O volume de
peças é pequeno/médio e cada peça é única ou produzida em pequenos lotes
(característica de artesanato), o que torna um fluxo de e-commerce completo
(estoque em tempo real, pagamento online) desproporcional ao problema.

## Decisão

O site será uma **vitrine estática**: lista peças com foto, nome, descrição
e preço. Não existe carrinho, checkout ou pagamento online. A
conversão de venda acontece fora do site, via Instagram (ver
[ADR-0004](0004-conversao-via-contato-externo.md); WhatsApp fez parte do
canal original e foi removido em 2026-07-09).

## Consequências

- Reduz drasticamente a complexidade técnica (sem backend de pedidos, sem
  gestão de estoque em tempo real, sem gateway de pagamento).
- Atualização de disponibilidade de uma peça é manual (editar o arquivo de
  dados), o que é aceitável dado o volume esperado.
- Se o volume de peças ou pedidos crescer a ponto de o processo manual de
  contato não escalar, esta decisão deve ser revisitada.

## Alternativas consideradas

- **Catálogo + carrinho sem pagamento** (monta pedido, envia formatado pelo
  canal de contato): mais complexidade de estado no front-end sem ganho
  real, já que o fechamento ainda é manual.
- **E-commerce completo**: rejeitado por complexidade desproporcional ao
  estágio atual do negócio.
