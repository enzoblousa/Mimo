# ADR-0002: Stack técnica é HTML/CSS/JS vanilla, sem framework nem build step

- Status: Aceito
- Data: 2026-07-08

## Contexto

O site é uma vitrine estática (ver [ADR-0001](0001-escopo-vitrine-estatica.md)),
sem necessidade de estado complexo, roteamento client-side elaborado ou
renderização no servidor. O time é pequeno e a manutenção de longo prazo
(provavelmente pelo próprio dono da loja ou um dev ocasional) pesa mais do que
ergonomia de um framework.

## Decisão

O site será construído com **HTML, CSS e JavaScript vanilla**, sem framework
(React/Vue/etc.) e sem etapa de build (bundler, transpilador). Os arquivos
publicados são os mesmos arquivos editados.

JavaScript é usado apenas para:
- Carregar e renderizar os dados de produtos (`data/produtos.json`) nos cards.
- Busca simples no catálogo.
- Abrir/fechar o modal/página de detalhe da peça.

## Consequências

- Deploy é trivial: qualquer hospedagem de arquivos estáticos serve (ver
  [ADR-0004](0004-hospedagem-estatica.md)). Não há `npm install`/`build` para
  quebrar.
- Sem TypeScript, sem verificação de tipos em tempo de build — validação de
  dados do catálogo precisa ser feita com disciplina manual ou um script leve
  de validação (ver `docs/specs/0004-nao-funcional.md`).
- Se o site crescer para múltiplas páginas com lógica de estado compartilhada
  complexa, esta decisão deve ser revisitada.

## Alternativas consideradas

- **Next.js/React + Tailwind**: mais robusto para crescer, mas adiciona
  Node.js, build step e uma curva de manutenção que não se justifica para uma
  vitrine estática.
- **Astro/outro SSG**: meio-termo interessante, mas ainda introduz um build
  step; adiado até haver necessidade real (ex.: múltiplas páginas de
  conteúdo, geração de imagens otimizadas).
