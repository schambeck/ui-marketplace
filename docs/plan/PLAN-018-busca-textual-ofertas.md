# PLAN-018 — Busca textual de ofertas publicadas

**PRD:** [`PRD-018`](../prd/PRD-018-busca-textual-ofertas.md)  
**Plano relacionado:** [`api-marketplace PLAN-018`](../../../api-marketplace/docs/plan/PLAN-018-busca-textual-ofertas.md)  
**Dependências:** `CatalogService`, endpoint paginado de ofertas e contrato de `search`.  
**Status:** Implementado no frontend.

## Estado atual e alvo

O catálogo já é pesquisável por ofertas publicadas. O `CatalogService` envia `page`, `size` e `search`; a tela aplica debounce e evita novas consultas para o mesmo termo. O contrato da API permanece responsável por filtrar produto, contexto e status de publicação.

## Abordagem técnica

Implementação existente em `list-catalog.component`, template, `CatalogService` e specs: `Subject`, `debounceTime(500)`, `distinctUntilChanged`, paginação e encaminhamento de `search`. A UI não filtra a página local; a API é a fonte de verdade para os campos pesquisáveis e o status. Qualquer normalização adicional de vazio/espaços deve preservar a compatibilidade atual.

## Implementação registrada

- `src/app/shared/service/catalog.service.ts` envia `search` em `GET /catalog/offers`, junto com `page` e `size`.
- `src/app/feature/catalog-screen/list-catalog/list-catalog.component.ts` usa debounce de 500 ms e `distinctUntilChanged`.
- A listagem mantém `loading`, `totalElements`, paginação e estados de erro.
- A inclusão no carrinho usa a oferta retornada, sem substituir silenciosamente o resultado por produto.
- `src/app/shared/service/catalog.service.spec.ts` verifica o encaminhamento do termo e a hidratação do produto.

## Validação

1. Confirmar o teste unitário existente do serviço para ausência/termo/paginação.
2. Executar testes do componente para debounce, troca de termo, estado vazio/erro e paginação.
3. Confirmar contrato integrado com ofertas publicadas e nenhum resultado.
4. Executar `npm run build` e `npm run test-headless`.

## Matriz de aceite

| Critério | Evidência |
|---|---|
| Vazio equivale a sem filtro | serviço/API; confirmar em teste de contrato |
| Campos de produto/contexto pesquisáveis | fixture de contrato da API |
| Não publicados não aparecem | fixture de status publicado/não publicado |
| Paginação preservada | implementação de `Page` e spec de componente |
| Nenhum resultado/erro | teste de template e interceptor |

## Riscos e rollback

Chamadas duplicadas, resultados antigos e `forkJoin` sem itens podem causar estados inconsistentes; a cobertura de lista vazia e respostas fora de ordem permanece uma verificação recomendada. Rollback: remover apenas o campo/encaminhamento de busca, preservando catálogo paginado.

## Evidência da implementação

- inspeção confirmou o parâmetro `search` no serviço e no teste HTTP;
- inspeção confirmou debounce, `distinctUntilChanged`, loading e paginação no componente;
- a execução de `npm run build` e `npm run test-headless` deve ser registrada quando a suíte for executada no ambiente com dependências/configuração disponíveis.
