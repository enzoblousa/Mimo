# ADR-0005: Hospedagem como site estático (GitHub Pages)

- Status: Aceito
- Data: 2026-07-08

## Contexto

Decorrente de [ADR-0002](0002-stack-html-css-js-vanilla.md), o site é um
conjunto de arquivos estáticos (HTML/CSS/JS/JSON/imagens) sem build step nem
backend.

## Decisão

O site é publicado via **GitHub Pages** a partir deste mesmo repositório
(branch `main`, pasta raiz ou `/docs` conforme configuração do Pages). Não há
etapa de build no deploy: os arquivos do repositório são os arquivos
servidos.

## Consequências

- Deploy é `git push`: sem custo, sem CI/CD necessário, sem conta em serviço
  externo além do GitHub que já hospeda o código.
- Domínio próprio (se a loja quiser, ex. `mimoceramica.com.br`) pode ser
  apontado via CNAME para o GitHub Pages sem mudar a stack.
- Sem otimizações automáticas de imagem/CDN além do que o GitHub Pages
  oferece — se performance de imagem virar problema, tratar como item de
  requisito não-funcional (ver `docs/specs/0004-nao-funcional.md`), não como
  mudança de hospedagem.
- Se no futuro o projeto ganhar um build step (ex. adoção de um SSG), esta
  decisão é compatível: GitHub Pages também serve o output de um build via
  GitHub Actions.

## Alternativas consideradas

- **Netlify/Vercel**: oferecem mais recursos (preview deploys, funções
  serverless), mas nenhum é necessário hoje; GitHub Pages evita mais uma
  conta/serviço externo.
