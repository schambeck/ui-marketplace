# PRD-018 — Busca textual de ofertas publicadas

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-018-busca-textual-ofertas.md` · Catálogo  
**Dependência:** contrato de `GET /catalog/offers` e paginação existente.

## Problema e objetivo

O catálogo possui paginação, mas o parâmetro de busca não é aplicado. O cliente deve conseguir localizar ofertas publicadas por dados do produto e contexto, mantendo ordenação, paginação e disponibilidade atuais.

## Escopo

- campo de busca no catálogo com debounce e estado de carregamento;
- encaminhar `search` para o endpoint público;
- preservar filtro de ofertas publicadas, paginação e ordenação;
- informar busca vazia, nenhum resultado e erro sem perder o termo.

## Critérios de aceite

- Ausência, vazio e espaços equivalem à listagem sem filtro.
- Busca é case-insensitive e encontra nome, descrição, categoria, game, publisher, plataforma, região, servidor e variante quando retornados pelo contrato.
- Oferta não publicada nunca aparece apenas por coincidir com o termo.
- Total, página atual e tamanho permanecem coerentes após nova busca.
- Alterar o termo cancela/ignora resposta antiga e não mistura resultados.
- Testes cobrem debounce, parâmetros, nenhum resultado, paginação, erro e preservação do catálogo sem busca.

## Limites

Normalização, consulta, `countQuery`, campos pesquisáveis e filtro de status pertencem à API. A UI não filtra somente a página já carregada nem promete relevância que o backend não fornece.
