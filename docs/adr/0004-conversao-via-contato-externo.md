# ADR-0004: Conversão de venda via WhatsApp e Instagram, não checkout interno

- Status: Aceito
- Data: 2026-07-08

## Contexto

Decorrente de [ADR-0001](0001-escopo-vitrine-estatica.md): não há checkout no
site. Ainda assim o site precisa converter interesse em venda de alguma
forma.

## Decisão

Cada peça e o rodapé do site têm um botão/link de contato que abre:
- **WhatsApp** via link `https://wa.me/<numero>?text=<mensagem pré-preenchida
  mencionando o nome da peça>`.
- **Instagram** do perfil da loja, como canal alternativo.

Não há formulário de contato próprio (sem backend para processar envio).

## Consequências

- Zero fricção de implementação (link puro, sem backend, sem serviço de
  e-mail transacional).
- A mensagem pré-preenchida do WhatsApp precisa ser mantida em sincronia com
  o nome/slug da peça — feito via template de string no JavaScript de
  renderização, não hardcoded por peça.
- Depende de o número de WhatsApp e o @ do Instagram estarem corretos em
  `data/config.json` (ver DESIGN.md) — checagem manual antes do deploy.

## Alternativas consideradas

- **Formulário de contato próprio**: exigiria um backend ou serviço terceiro
  (Formspree, etc.), custo/complexidade extra sem ganho claro sobre WhatsApp
  direto, que já é o canal natural do público-alvo.
