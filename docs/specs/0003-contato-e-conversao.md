# SPEC-0003: Contato e Conversão

- Status: Aceito
- ADRs relacionados: [0004](../adr/0004-conversao-via-contato-externo.md)

## Objetivo

Converter interesse em uma peça específica (ou interesse geral pela loja) em
uma conversa via WhatsApp ou Instagram.

## Requisitos funcionais

### RF-01: CTA por peça

- No detalhe de cada peça com `status` diferente de `"vendida"` (SPEC-0001
  RF-04), existe um botão "Perguntar sobre esta peça" que abre um link
  `wa.me` com mensagem pré-preenchida, variando pelo `status`
  (ver `docs/design/DESIGN.md` §2):
  - `disponivel`: `Olá! Tenho interesse na peça "<nome da peça>". Ainda está disponível?`
  - `sob-encomenda`: `Olá! Vi a peça "<nome da peça>" sob encomenda. Como funciona pra encomendar?`
- Peças com `status: "vendida"` não mostram este botão.

### RF-02: CTA geral

- Rodapé e header contêm link direto para o WhatsApp da loja (sem mensagem
  pré-preenchida, ou com uma saudação genérica) e para o perfil do
  Instagram.
- Número de WhatsApp e handle do Instagram vêm de `data/config.json`, nunca
  hardcoded em mais de um lugar.

### RF-03: Link no formato correto

- Link do WhatsApp segue o formato
  `https://wa.me/<código do país><DDD><número>?text=<mensagem codificada em URL>`.
- Abre em nova aba (`target="_blank"`, com `rel="noopener noreferrer"`).

## Critérios de aceite

- [ ] Clicar em "Perguntar sobre esta peça" abre o WhatsApp Web/app com o
      número correto e a mensagem mencionando o nome exato da peça.
- [ ] Trocar o número de WhatsApp em `config.json` reflete em todos os
      links do site sem editar HTML.
- [ ] Nenhum link de contato aparece quebrado (sem `href="#"` vazio) em
      nenhuma página.
