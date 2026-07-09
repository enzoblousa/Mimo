# ADR-0004: Conversão de venda via Instagram, não checkout interno

- Status: Aceito
- Data: 2026-07-08 (revisado em 2026-07-09)

## Contexto

Decorrente de [ADR-0001](0001-escopo-vitrine-estatica.md): não há checkout no
site. Ainda assim o site precisa converter interesse em venda de alguma
forma.

> **Revisão (2026-07-09, decisão do usuário)**: a decisão original (abaixo,
> preservada como histórico) usava WhatsApp — via link `wa.me` com mensagem
> pré-preenchida por peça — como canal primário, com Instagram como
> alternativa. O WhatsApp foi **removido por completo** como canal de
> contato/conversão do site; Instagram passou a ser o único canal.

## Decisão

Cada peça e o rodapé/header do site têm um link para o **perfil do
Instagram** da loja (`data/config.json`). Não há WhatsApp, formulário de
contato próprio, nem qualquer outro canal.

~~Cada peça e o rodapé do site têm um botão/link de contato que abre:~~
~~- **WhatsApp** via link `https://wa.me/<numero>?text=<mensagem
pré-preenchida mencionando o nome da peça>`.~~
~~- **Instagram** do perfil da loja, como canal alternativo.~~

(Decisão original, 2026-07-08 — substituída pela revisão acima.)

## Consequências

- Zero fricção de implementação (link puro, sem backend).
- **Perda da mensagem pré-preenchida por peça**: o Instagram não tem
  equivalente ao `wa.me/<numero>?text=<mensagem>` — não é possível
  pré-preencher uma DM por link. O CTA por peça ("Perguntar no Instagram")
  usa o mesmo link genérico do perfil que já aparece no header/rodapé, sem
  menção à peça específica.
- Depende do @ do Instagram estar correto em `data/config.json` (ver
  DESIGN.md) — checagem manual antes do deploy.

## Alternativas consideradas

- **Manter WhatsApp como canal adicional** (descartada em 2026-07-09):
  decisão do usuário foi concentrar tudo em um único canal de contato.
- **Link de DM direto (`https://ig.me/m/<usuario>`)** (descartada em
  2026-07-09): abre a conversa de DM em vez do perfil, mas ainda não permite
  pré-preencher mensagem — ganho marginal sobre o link de perfil, não
  justificou a complexidade extra.
- **Formulário de contato próprio**: exigiria um backend ou serviço terceiro
  (Formspree, etc.), custo/complexidade extra sem ganho claro sobre o link
  direto de Instagram.
