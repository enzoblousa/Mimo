# Mimmo Cerâmica — Catálogo

Landing page/catálogo para uma loja de peças de cerâmica feitas à mão. Este
projeto segue Spec Driven Development: toda decisão relevante está
documentada antes do código, em `docs/`.

## Onde está a documentação

- `docs/PRD.md` — contexto de negócio e produto (por que o site existe, quem
  é a Flávia Mangabeira, o que ela vende, canais reais de contato). Fonte de
  verdade para qualquer dúvida de "por que isso é assim" que não seja
  puramente técnica.
- `docs/adr/` — decisões arquiteturais (por que a stack e o escopo são o que
  são). Leia antes de propor mudar stack, escopo ou hospedagem.
- `docs/specs/` — o que o site deve fazer, com critérios de aceite
  verificáveis.
- `docs/design/DESIGN.md` — estrutura de arquivos, schema de dados,
  direção visual.
- `docs/tasks/TASKS.md` — checklist de implementação, organizado por fase.
- `docs/evidence/` — provas de que os critérios de aceite foram verificados
  (screenshots, relatórios Lighthouse, etc.), não apenas implementados.

Ao implementar algo, siga a ordem: ler a spec relevante → conferir
DESIGN.md para a decisão técnica já tomada → implementar → marcar item em
TASKS.md → registrar evidência.

## Decisões que já foram tomadas (não reabrir sem novo ADR)

- Vitrine estática, sem carrinho/checkout/pagamento online
  ([ADR-0001](docs/adr/0001-escopo-vitrine-estatica.md)).
- HTML/CSS/JS vanilla, sem framework, sem build step
  ([ADR-0002](docs/adr/0002-stack-html-css-js-vanilla.md)).
- Dados de produto em `data/produtos.json`, versionado no repo, sem CMS/DB
  ([ADR-0003](docs/adr/0003-dados-produtos-json-local.md)).
- Conversão de venda via link de WhatsApp/Instagram, sem formulário próprio
  ([ADR-0004](docs/adr/0004-conversao-via-contato-externo.md)).
- Hospedagem em GitHub Pages ([ADR-0005](docs/adr/0005-hospedagem-estatica.md)),
  mas **deploy público está adiado** — fase atual é rodar só localmente, sem
  domínio nem prazo ([ADR-0006](docs/adr/0006-placeholder-e-deploy-adiado.md)).
- Imagens placeholder de terceiros são aceitáveis só em ambiente local,
  nunca em deploy público, até existirem fotos reais das peças
  ([ADR-0006](docs/adr/0006-placeholder-e-deploy-adiado.md)).

Se uma tarefa parecer exigir reabrir uma dessas (ex.: "adicionar carrinho",
"migrar para React", "usar um CMS"), pare e confirme com o usuário — isso é
uma mudança de ADR, não uma tarefa de implementação normal.

## Rodando o projeto localmente

Sem build step. Para evitar problemas de CORS com `fetch()` em
`data/produtos.json`, sirva os arquivos com um servidor estático simples em
vez de abrir `index.html` direto com `file://`:

```bash
python3 -m http.server 8000
# ou: npx serve
```

Depois acesse `http://localhost:8000`.

## Adicionando ou editando uma peça

Editar `data/produtos.json` seguindo o schema em `docs/design/DESIGN.md`
(§2). Adicionar as imagens correspondentes em
`assets/imagens/produtos/<slug>-N.jpg`. Nenhum outro arquivo precisa mudar.
Depois de editar, rodar:

```bash
node scripts/validar-produtos.js
```

## Convenções de código

- Sem dependências externas (sem npm packages em runtime) — ver ADR-0002.
- JavaScript organizado por responsabilidade em `assets/js/`
  (`produtos.js`, `filtro.js`, `modal.js`, `contato.js`) — ver DESIGN.md §1.
- Categorias de produto nunca são hardcoded em HTML/JS: sempre derivadas de
  `data/produtos.json`.
- Textos institucionais (nome da loja, "sobre", contato) vêm de
  `data/config.json`, nunca duplicados hardcoded em HTML.

## Verificação

Antes de considerar uma tarefa de `TASKS.md` concluída, verificar contra os
critérios de aceite da spec correspondente e registrar evidência em
`docs/evidence/` (ver `docs/evidence/README.md` para convenção). Para
mudanças de UI, testar de fato no navegador — não apenas ler o código.
