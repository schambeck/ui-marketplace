# PLAN-001 — Contexto de game e variante no frontend

**PRD:** [`PRD-001`](../prd/PRD-001-contexto-game-variante.md)  
**Plano relacionado:** [`api-marketplace PLAN-001`](../../../api-marketplace/docs/plan/PLAN-001-contexto-game-variante.md)  
**Dependências:** contrato final de `GameContext` na API; definição da associação com `Offer` no PLAN-002.  
**Escopo:** `ui-marketplace`; não implementar `Offer`, pedido, catálogo backend ou regras de domínio da API.

## Estado atual e alvo

O frontend usa `Product` como modelo único em catálogo, detalhe, carrinho, checkout e manutenção administrativa. O modelo atual contém nome, descrição, preço, quantidade, usuário, categoria, status de inventário, avaliação e imagem, mas não possui game, publisher, plataforma, região, servidor ou variante. As telas públicas consultam `/catalog`, e as telas administrativas mantêm `/products`.

O alvo é representar `GameContext` como modelo próprio e consumir a referência retornada pelo backend sem misturar contexto com preço, inventário, imagem ou identidade do produto. A UI deverá:

- exibir contexto ativo no catálogo e no detalhe;
- sinalizar estados não vendáveis;
- oferecer manutenção administrativa protegida e consulta de histórico quando os endpoints estiverem disponíveis;
- preservar os fluxos existentes durante a transição de contrato;
- entregar ao PLAN-002 uma base de apresentação/seleção de contexto, sem criar a associação concreta com `Offer`.

## Premissas e decisões de contrato

As decisões abaixo vêm do PLAN-001 da API e devem ser tratadas como pré-condições para a implementação:

- `game` e `platform` são obrigatórios;
- `publisher`, `region`, `server` e `variant` permanecem valores extensíveis;
- `server` exige `region`;
- status possíveis: `ACTIVE`, `INACTIVE`, `DISCONTINUED`;
- `DISCONTINUED` é terminal e não pode ser editado;
- contextos inativos/descontinuados permanecem consultáveis para histórico, mas não originam nova venda/oferta;
- a mutação administrativa exige role `ADMIN`;
- `GET /game-contexts` é público e retorna apenas contextos `ACTIVE`;
- a associação entre `Product`/`Offer` e contexto, a validação de publicação e o snapshot usado em pedidos pertencem ao PLAN-002.

O nome final dos endpoints administrativos, formato de erros, estrutura do contexto embutido em `Product`/catálogo e contrato de histórico devem ser confirmados antes de codificar os serviços Angular. Se divergirem, este plano deve ser atualizado antes da implementação.

## Abordagem técnica

### 1. Modelo e acesso HTTP

Criar um modelo `GameContext` separado de `Product`, preferencialmente em `src/app/shared/model/game-context.entity.ts`, com os campos públicos aprovados pelo contrato: `id`, `version`, `game`, `platform`, `publisher`, `region`, `server`, `variant`, `status`, `createdAt`, `modifiedAt` e o usuário de alteração quando exposto.

Criar serviço dedicado em `src/app/shared/service/game-context.service.ts`, seguindo o padrão de `ProductService` e `CatalogService`:

- `environment.baseUrl` como origem;
- `HttpClient` e `HttpUtil` existentes;
- `Observable<T>` tipado;
- paginação com `page`, `size` e `search`;
- `encodeURIComponent` para IDs em URLs;
- métodos públicos de consulta e métodos administrativos separados por intenção;
- tratamento de `4xx`, conflito de versão e autorização por meio do interceptor/mensagens existentes.

Não colocar chamadas HTTP nem regras de compatibilidade no modelo. A API permanece autoridade sobre combinações válidas e transições de status.

### 2. Integração com catálogo e detalhe

Atualizar os modelos/contratos consumidos por `CatalogService`, `ProductService`, `ListCatalogComponent` e `ViewProductComponent` para aceitar a referência de contexto definida pela API. A apresentação deve:

- mostrar game e plataforma como resumo principal;
- mostrar publisher, região, servidor e variante somente quando presentes;
- distinguir visualmente contexto de dados do produto;
- bloquear ou esconder adicionar ao carrinho para contexto não vendável;
- manter imagens, preço, inventário, busca e paginação sem regressão;
- tolerar resposta transitória sem contexto, conforme a estratégia de compatibilidade aprovada.

Se a API retornar o contexto por endpoint separado, usar o serviço dedicado com carregamento coordenado e estado explícito de loading/erro; não fazer chamadas duplicadas por item sem necessidade.

### 3. Área administrativa

Adicionar uma feature `game-context-screen` seguindo a arquitetura `NgModule` existente, com:

- listagem paginada e busca;
- formulário de criação/edição;
- visualização de status, versão e auditoria como somente leitura;
- confirmação para descontinuação;
- consulta de histórico/snapshots quando o endpoint for entregue;
- rota protegida por `AuthGuard` e autorização compatível com `ADMIN`.

Arquivos previstos:

- `src/app/feature/game-context-screen/game-context-screen.module.ts`;
- `src/app/feature/game-context-screen/list-game-context/list-game-context.component.ts|html|css`;
- `src/app/feature/game-context-screen/edit-game-context/edit-game-context.component.ts|html|css`;
- `src/app/feature/game-context-screen/history-game-context/history-game-context.component.ts|html|css`, se o histórico for exposto em tela independente;
- alterações em `src/app/app.module.ts`, `src/app/app-routing.module.ts` e `src/app/feature/sidebar-screen/sidebar/sidebar.component.ts`.

O formulário fará validações de presença de game/platform e da dependência server/region. A UI não deve reproduzir regras específicas desconhecidas nem permitir alterações em contexto descontinuado.

### 4. Compatibilidade e segurança

Preservar `Product` e os fluxos de carrinho/checkout até que o PLAN-002 entregue a associação formal com `Offer`. Não alterar `schema/ui-schema-marketplace.json` nem executar `generate-ui-components.sh` salvo decisão explícita de tornar `GameContext` uma entidade gerada pelo schema.

Respeitar o estado de autenticação existente, a proteção de rotas e os papéis fornecidos pelo backend. A UI não deve confiar apenas em esconder botões: mutações continuam protegidas pela API.

## Sequência de implementação

1. **Fechar contrato:** comparar DTOs/controllers/schema da API com o PRD e registrar endpoint, payload, status, erro e formato de referência usados pelo frontend.
2. **Criar modelo e serviço:** adicionar `GameContext`, tipos de status, paginação/requests necessários e testes unitários do serviço.
3. **Integrar leitura pública:** atualizar catálogo e detalhe para exibir o contexto e tratar estados ativos, inativos, descontinuados, ausentes, loading e erro.
4. **Adicionar manutenção:** criar módulo, rotas, menu, listagem e formulário administrativo com validação local mínima, confirmação e mensagens acionáveis.
5. **Adicionar histórico:** integrar snapshots imutáveis, caso o endpoint esteja disponível no contrato desta entrega.
6. **Verificar compatibilidade:** revisar carrinho, checkout, imagens, autocomplete de produto e todos os consumidores de `Product` afetados pelo novo campo/referência.
7. **Validar e revisar:** executar build/testes, revisar acessibilidade, diff, rotas, contratos, arquivos gerados e ausência de segredos.

## Mapeamento de arquivos e áreas afetadas

| Área | Arquivos existentes | Mudança esperada |
|---|---|---|
| Modelo | `src/app/shared/model/product.entity.ts`, novos modelos de contexto | Separar contexto e manter compatibilidade do produto |
| Serviços | `src/app/shared/service/catalog.service.ts`, `product.service.ts`, novo `game-context.service.ts` | Consumir referência/contexto com URLs e paginação padronizadas |
| Catálogo | `feature/catalog-screen/list-catalog/*`, `view-product/*` | Resumo/detalhe, status e ação de carrinho |
| Administração | novo `feature/game-context-screen/*` | CRUD, validações, auditoria e histórico |
| Navegação | `app-routing.module.ts`, `app.module.ts`, `sidebar/sidebar.component.ts` | Rotas protegidas e entrada administrativa |
| Erros | `error-http-interceptor.service.ts` e componentes afetados | Mensagens para 4xx, conflito e indisponibilidade |
| Testes | specs próximas e novos specs | Cobrir contrato, estados e regressões |
| Schema/geração | `schema/ui-schema-marketplace.json`, `generate-ui-components.sh` | Não alterar sem decisão explícita |

## Validação técnica

### Testes unitários

- serviço mapeia listagem/detalhe e preserva campos opcionais ausentes;
- URLs usam `environment.baseUrl`, paginação correta e IDs codificados;
- validação rejeita game/platform ausentes e server sem region;
- contexto `DISCONTINUED` não pode ser editado;
- estados `ACTIVE`, `INACTIVE` e `DISCONTINUED` produzem flags/ações corretas;
- erros `400`, `401/403`, `409` e indisponibilidade preservam o estado do formulário e exibem motivo acionável.

### Testes de componentes

- catálogo e detalhe exibem produto e contexto em áreas distintas;
- campos opcionais não exibem placeholders enganosos;
- botão de carrinho/oferta fica indisponível para estados não vendáveis;
- listagem administrativa apresenta busca, paginação, vazio e loading;
- formulário valida dependência server/region e desabilita edição terminal;
- confirmação de descontinuação informa retenção histórica;
- rota administrativa exige autenticação/autorização conforme o contrato.

### Teste de contrato/integrado

Usar payloads controlados da API para comprovar:

- contexto ativo consultável publicamente;
- contexto inativo/descontinuado preservado em histórico e não vendável;
- resposta de validação com motivo acionável;
- conflito de versão na atualização;
- produto/contexto/variante apresentados em níveis distintos.

Não usar credenciais, tokens reais ou dados de pagamento. A validação integrada depende da API PLAN-001 disponível e de um ambiente de teste controlado.

## Matriz de rastreabilidade

| PRD | Implementação planejada | Evidência |
|---|---|---|
| RF-001 | `GameContext` próprio e serviço tipado | testes de modelo/serviço e payload de contrato |
| RF-002 | catálogo/detalhe com bloco de contexto | testes de componentes e inspeção visual |
| RF-003 | estados e ações vendáveis | testes de estado e jornada pública |
| RF-004 | feature administrativa, rotas e autorização | testes de rota/componente e API de teste |
| RF-005 | validação mínima e tratamento de 4xx | specs de formulário/serviço |
| RF-006 | auditoria/versionamento somente leitura | teste de template e histórico integrado |
| RF-007 | compatibilidade com catálogo/carrinho/checkout | `npm run build`, testes existentes e regressão dirigida |
| AC1–AC3 | modelo, catálogo, detalhe e estados | testes de componente + contrato |
| AC4–AC6 | CRUD, validações, confirmação e erros | testes de componente/serviço + API |
| AC7 | integração não destrutiva | build e testes de regressão |
| AC8 | suíte específica da feature | `npm run test-headless` |

## Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| API retornar formato diferente do esperado | retrabalho e quebra de catálogo | fechar contrato antes da implementação e adicionar teste de contrato |
| contexto embutido em `Product` duplicar campos | inconsistência visual e de dados | manter `GameContext` separado e exibir apenas fonte contratada |
| autorização existir apenas no backend | ações indevidas na UI | proteger rota/ações e tratar `403`; nunca considerar ocultação como segurança |
| catálogo misturar contexto histórico | venda indevida | derivar ações do status e bloquear estados não vendáveis |
| schema gerador gerar alterações incidentais | diff amplo e regressões | não usar gerador nesta etapa sem decisão registrada |
| ausência de endpoint de histórico | AC parcialmente implementável | entregar status/auditoria disponíveis e marcar histórico como dependência aberta |

## Handoff e limites

Ao concluir este plano, o PLAN-002 deve receber:

- o modelo e a forma de exibição da referência de contexto;
- os estados que bloqueiam nova oferta/compra;
- a convenção de labels e campos opcionais;
- os casos de erro e conflito que a UI já suporta;
- a confirmação de que o frontend não cria associação de `Offer` nem snapshot de pedido por conta própria.

O plano fica `BLOCKED` para implementação quando o contrato da API não definir, de forma verificável, a referência de contexto no catálogo/detalhe ou os endpoints de mutação. Até essa decisão, somente o fechamento documental e mocks controlados podem avançar.

## Implementação do contrato — 2026-09-20

O contrato atualmente disponível na API permite avançar em duas etapas sem duplicar contexto em `Product`:

1. O catálogo público consome `GET /catalog/offers` e `GET /catalog/offers/{id}`. Cada `Offer` traz `productId`, preço, disponibilidade e a referência `context` com os atributos do `GameContext`. Como o payload público traz apenas `productId`, o frontend hidrata o produto por `GET /products/{id}` para preservar nome, imagem e demais dados visuais existentes.
2. A inclusão no carrinho envia `offerId` (mantendo `productId` apenas por compatibilidade), e o detalhe/carrinho/checkout usam `offerId` como identidade de navegação e compra. O backend já valida publicação, disponibilidade e o snapshot de contexto antes do checkout.

A tela administrativa usa `GET /game-contexts` (contextos `ACTIVE`), `POST /game-contexts`, `PUT /game-contexts/{id}` e `GET /game-contexts/{id}/history`, com rota protegida por `ADMIN`.

O backend agora aceita e aplica `search` em `GET /catalog/offers` e `GET /offers`, preservando paginação e o filtro de ofertas publicadas. A limitação contratual de busca pública está resolvida; resta apenas validar a jornada integrada com dados publicados em ambiente controlado.

## Evidência de conclusão

- `npm run build` passa no `ui-marketplace`;
- `npm run test-headless` passa, incluindo os novos testes;
- contrato de API validado para contexto ativo, inativo, descontinuado, erro de validação e conflito;
- `git diff --check` passa;
- `git status` mostra apenas arquivos previstos do frontend;
- nenhum segredo, token, certificado, `auth_config*.json` ou arquivo de ambiente foi incluído.
