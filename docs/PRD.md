# PRD — Mimmo Cerâmica

Documento de requisitos de produto. É a fonte de contexto de negócio que
sustenta os ADRs (`docs/adr/`) e Specs (`docs/specs/`) já escritos — se uma
resposta aqui contradisser uma decisão já tomada, revisamos o ADR
correspondente.

Status: **preenchido** (entrevista concluída em 2026-07-08). Itens ainda
marcados [A PREENCHER] são de baixa prioridade e não bloqueiam o início da
implementação.

## 1. Visão do produto

- **Problema a resolver**: A loja ainda não existe — nasceu de uma ideia da
  namorada do autor (Flávia Mangabeira) de vender suas peças de arte/cerâmica
  para amigas via Instagram. O site nasce **junto com a loja**, não depois
  dela: serve como catálogo público e ponte de contato (Instagram)
  desde o primeiro dia, em vez de depender só de posts soltos no Instagram
  pessoal.
- **Visão de sucesso em 1 frase**: Amigas e conhecidas conseguem ver as
  peças da Flávia organizadas num só lugar e chegam até ela pelo Instagram
  para comprar, sem fricção.

## 2. Contexto de negócio / marca

- **Nome da loja**: **Mimmo** (com 2 "M"s — corrigir em todos os documentos
  já escritos, que usaram "Mimo" por engano/suposição do nome da pasta).
- **História/origem da marca**: Projeto novo, criado pelo casal — ideia da
  Flávia de expor as peças que ela faz, incentivada pelo autor, que está
  construindo o site. Não há histórico de vendas anterior.
- **Há quanto tempo a loja existe / vende peças**: Ainda não existe como
  loja formal — é um lançamento.
- **Onde vende hoje**: Vai ter um Instagram **dedicado à loja** no futuro,
  mas o lançamento começa usando o Instagram pessoal da Flávia
  (@flaviamangabeirab) até a migração. Ou seja: `config.json` precisa ser
  fácil de atualizar o handle do Instagram sem tocar em outro código quando
  essa migração acontecer (já coberto por ADR-0003/DESIGN.md).
- **Diferencial**: Feito com carinho, handmade — autoria pessoal da Flávia,
  sem detalhe técnico adicional (não é sobre uma técnica específica de
  cerâmica, é sobre o cuidado artesanal). Este é o ângulo a usar no texto
  de "Sobre" (SPEC-0002 RF-02).
- **Tom de voz da marca**: Aconchegante, colorido, intimista (confirmado).

## 3. Público-alvo

- **Quem compra hoje**: Amigas e conhecidas da Flávia, comprando tanto para
  presente quanto para uso próprio. Faixa etária 18-40 anos.
- **Como te encontram hoje**: Círculo pessoal/Instagram pessoal da Flávia.
- **Objeção comum de quem não compra**: [A PREENCHER, se souber]

## 4. Catálogo de produtos

- **Quantas peças ativas hoje**: Zero ainda fotografadas/prontas para
  publicar. **Escopo inicial de lançamento: 10 peças** (catálogo pequeno de
  propósito). O catálogo inicial vai ao ar com **imagens placeholder da
  internet** (não fotos reais das peças da Flávia) enquanto as fotos reais
  não ficam prontas — ver nota de risco na seção 7.
  > **Impacto em SPEC/DESIGN**: com apenas 10 peças, a busca textual
  > (SPEC-0001 RF-03) é ainda menos prioritária do que já estava marcada —
  > pode ficar para uma fase posterior sem prejuízo de uso.
- **Categorias**: reintroduzidas em 2026-07-09 (decisão do usuário) — o
  catálogo volta a agrupar/filtrar peças por categoria, agora com 6
  categorias fixas: **Decorativas, Utilitárias, Animais, Porta-copos,
  Porta-Joias, Para Presentear** (campo `categoria`, enum fechado, ver
  SPEC-0001 RF-02 e `docs/design/DESIGN.md` §2; "Para Presentear"
  adicionada depois, mesmo dia). Das 10 peças do catálogo inicial, todas
  caem em Decorativas ou Utilitárias; as outras 4 categorias ainda não
  têm peça publicada — aparecem no filtro já preparadas para quando
  entrarem peças nelas (catálogo cresce toda semana, ver frequência de
  novas peças abaixo).
- **Faixa de preço** (menor e maior preço de peça): Chute inicial:
  **R$ 15 a R$ 30** por peça (faixa de entrada, ajustável conforme peças
  reais forem definidas).
- **Peças são únicas (uma de cada) ou pequenos lotes repetíveis?**:
  **Os dois modelos convivem**: peças únicas/personalizadas (feitas sob
  encomenda para a cliente) e peças de modelo repetido (mesmo desenho,
  disponíveis em mais de uma unidade). Isso é capturado pelo campo `tipo`
  do schema (ver nota de impacto abaixo). **O site não indica estado
  comercial da peça** (disponível/sob encomenda/vendida) — campo `status`
  removido por completo do schema em 2026-07-09, decisão do usuário (ver
  SPEC-0001 RF-01, SPEC-0003 RF-01, `docs/design/DESIGN.md` §2).
- **Controle de estoque/quantidade**: **Decisão: não mostrar quantidade
  restante no site por enquanto** (ex. nada de "restam 2 unidades"). Mesmo
  para peças de modelo repetível, o site não indica nenhum estado
  comercial da peça — sem número, sem rótulo. Simplifica o schema (não
  precisa de campo `quantidade` nem `status`) e evita a Flávia ter que
  manter uma contagem exata atualizada toda semana.
- **Prazo de produção sob encomenda**: **3 dias** após confirmação do
  pedido, quando a peça não está pronta em mãos. Esse prazo pode aparecer
  no texto/descrição da peça em `data/produtos.json` quando fizer sentido
  (ex. "pronta em até 3 dias após confirmação"), já que não há mais um
  selo/rótulo de status na UI para ancorar esse texto (SPEC-0001 RF-01).
- **Entrega**: Foco em entregas na região do **DF (Brasília)**, com
  abertura para enviar a outras cidades/estados mediante combinação. O
  site deve deixar isso claro (ex. no "Sobre" ou perto do CTA de contato),
  para não parecer que só atende Brasília nem prometer envio automático
  para qualquer lugar sem checagem — ajusta SPEC-0002 RF-02 (texto de
  "Sobre").
- **Frequência de novas peças/coleções**: Toda semana, peça nova.
  **Impacto**: reforça que editar `data/produtos.json` precisa ser
  realmente simples e rápido (ADR-0003) — este é o fluxo mais frequente de
  manutenção do site, não um caso raro.

> **Nota de impacto em DESIGN/SPEC (resolvida)**: a existência de peças
> "personalizadas sob encomenda" versus "modelo repetível pronto" exigiu
> revisar o schema de `produtos.json` (`docs/design/DESIGN.md`) e o RF-01
> do `docs/specs/0001-catalogo-de-pecas.md`, que originalmente só previa
> `disponivel: true/false`. Resultado: campo `tipo: "unica" |
> "modelo-repetivel"` foi adicionado e permanece; um campo `status`
> (`"disponivel" | "sob-encomenda" | "vendida"`) chegou a ser adicionado,
> depois teve sua leitura pela UI removida (2026-07-08) e por fim foi
> **removido do schema por completo em 2026-07-09** (decisão do usuário) —
> não existe mais estado comercial por peça no site.

## 5. Canais de contato e venda

- **Instagram (@handle real)**: @flaviamangabeirab (pessoal, por ora — ver
  seção 2 sobre migração futura para Instagram dedicado da loja).
- **WhatsApp**: removido como canal do site em 2026-07-09 (decisão do
  usuário) — Instagram é o único canal de contato/conversão. O número
  (+55 61 9 9579-3905) não é mais usado em nenhum link do site.
- **Outros canais a linkar** (Elo7, Etsy, e-mail): Nenhum por ora.
- **Quem responde o Instagram e com que tempo de resposta esperado**:
  Flávia Mangabeira. Tempo de resposta não formalizado (não crítico para o
  site — não vamos prometer SLA de resposta em texto).

## 6. Objetivos e métricas de sucesso

- **Métrica principal de sucesso do site**: Qualitativa por ora — "ter um
  lugar bonito para mandar o link" e receber mensagens pelo Instagram a
  partir dele. Sem meta numérica definida ainda.
- **Meta de curto prazo (3 meses)**: Nenhuma formal — sem prazo (ver seção 8).
- **Como saberemos que o site "não está funcionando"**: [A PREENCHER, se
  quiser formalizar — por ora, sucesso = existir, estar bonito, e gerar
  contato]

## 7. Conteúdo disponível

- **Fotos profissionais das peças já existem?**: **Não.** Zero fotos reais
  hoje. Lançamento inicial vai usar **imagens placeholder da internet**
  como substitutas temporárias, com plano de trocar por fotos reais das
  peças da Flávia assim que ficarem prontas.
  > **Risco a registrar**: usar fotos de terceiros da internet como
  > placeholder é aceitável apenas como rascunho de desenvolvimento/local,
  > **não deve ir para produção pública** (GitHub Pages, ADR-0005) por
  > risco de direito autoral/imagem de outra pessoa sendo associada à loja.
  > Ver ADR-0006 a ser criado.
- **Texto "sobre a loja" já existe ou precisa ser escrito**: Precisa ser
  escrito — nada pronto ainda.
- **Logo/identidade visual já existe?**: **Sim, desde 2026-07-09.** Logo
  ilustrado (nome "mimmo" com moldura floral) em
  `assets/imagens/site/logo.jpeg`, usado no header (`.logo`) de
  `index.html` e `sobre.html`. Até então o site usava um logotipo simples
  baseado em tipografia (nome "Mimmo" estilizado, sem ilustração/símbolo
  próprio) — troca feita sem mudar a estrutura do site, como já estava
  previsto (só um asset em `assets/imagens/site/`).

## 8. Restrições e prazo

- **Prazo desejado de lançamento**: Sem prazo definido.
- **Orçamento para domínio próprio/ferramentas pagas**: **Nenhum por
  enquanto.** Fase atual é rodar **apenas local** (ambiente de
  desenvolvimento), sem publicar em domínio público. Deploy/domínio fica
  para depois — ver nota de impacto em ADR-0005 e TASKS.md Fase 5, que
  deixam de ser bloqueantes para o momento atual do projeto.
- **Quem mantém o site depois de pronto**: Dado que peça nova é semanal
  (seção 4), provavelmente a Flávia (ou o autor, por ela) vai editar
  `produtos.json` toda semana — reforça a necessidade de esse processo ser
  o mais simples possível (nota de impacto na seção 4).

## 9. Referências visuais

- **Sites/lojas (de cerâmica ou não) que a dona gosta visualmente**:
  Nenhuma referência específica ainda.
- **Direção de cor desejada**: Tons pastel — rosa claro, vermelho
  (suave/pastel), branco — aconchegante e clean. Consistente com o tom de
  voz "aconchegante, colorido, intimista" (seção 2). **Substitui** a
  hipótese de paleta terrosa/terracota do `docs/design/DESIGN.md` §4,
  escrita antes desta entrevista. **Nota (2026-07-09)**: apesar dessa
  direção já apontar para rosa desde a entrevista original, o código só
  seguiu com a paleta terracota até esta data — a paleta em tons de rosa
  (DESIGN.md §4) é quem finalmente implementa esta direção de cor.
- **Sites/lojas que definitivamente NÃO quer parecer**: Nenhuma referência
  negativa ainda.

## 10. Fora de escopo (non-goals)

- **Confirmado**: carrinho, checkout e pagamento online continuam fora de
  escopo. O site é catálogo + contato (Instagram), consistente com
  ADR-0001 e ADR-0004.
