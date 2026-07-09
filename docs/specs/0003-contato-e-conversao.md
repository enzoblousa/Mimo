# SPEC-0003: Contato e Conversão

- Status: Aceito
- ADRs relacionados: [0004](../adr/0004-conversao-via-contato-externo.md)

## Objetivo

Converter interesse em uma peça específica (ou interesse geral pela loja) em
uma conversa via Instagram.

> **Revisão (2026-07-09, decisão do usuário)**: até 2026-07-08 o objetivo e
> os RFs abaixo incluíam WhatsApp (via `wa.me`) como canal primário. O
> WhatsApp foi removido por completo — Instagram é o único canal de contato
> do site. Ver ADR-0004.

## Requisitos funcionais

### RF-01: CTA por peça

- No detalhe de toda peça existe um botão "Perguntar no Instagram" que abre
  o link do perfil do Instagram da loja (`data/config.json`, mesmo link do
  RF-02) em nova aba.
- Não há mensagem pré-preenchida mencionando a peça — o Instagram não
  oferece um equivalente ao `wa.me/<numero>?text=<mensagem>` para isso
  (ADR-0004). Toda peça mostra o mesmo botão, sem variação por peça ou por
  estado comercial (ver SPEC-0001 RF-01, que removeu o campo `status`).

### RF-02: CTA geral

- Rodapé e header (em `index.html` e `sobre.html`) contêm link direto para
  o perfil do Instagram da loja.
- O handle do Instagram vem de `data/config.json`, nunca hardcoded em mais
  de um lugar.

### RF-03: Link no formato correto

- Link do Instagram usa a URL completa do perfil, lida de
  `config.instagram` (ex. `https://instagram.com/<usuario>`).
- Abre em nova aba (`target="_blank"`, com `rel="noopener noreferrer"`).

## Critérios de aceite

- [ ] Clicar em "Perguntar no Instagram" (no modal de detalhe de qualquer
      peça) abre o perfil correto do Instagram em nova aba.
- [ ] Trocar o handle do Instagram em `config.json` reflete em todos os
      links do site (header, rodapé, CTA por peça) sem editar HTML.
- [ ] Nenhum link de contato aparece quebrado (sem `href="#"` vazio) em
      nenhuma página.
- [ ] Nenhum link ou menção a WhatsApp/`wa.me` existe em nenhuma página do
      site.
