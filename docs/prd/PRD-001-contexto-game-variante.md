# PRD-001 — Contexto de game e variante no frontend

**Rastreabilidade:** PLAN-001 `api-marketplace/docs/plan/PLAN-001-contexto-game-variante.md` · BP-010 · Catálogo · Essencial  
**Dependência:** contrato de `GameContext` entregue pela API.  
**Próximo passo:** a associação concreta entre contexto, oferta e pedido pertence ao PLAN-002/PRD-002.

## Problema e objetivo

O frontend apresenta um produto como se seus atributos de catálogo, disponibilidade e contexto de uso fossem uma única coisa. Assim, o cliente pode visualizar uma oferta sem saber para qual game, plataforma, região, servidor ou variante ela é válida; o operador também não possui uma jornada para manter esses contextos.

Este PRD adapta a experiência do `ui-marketplace` para diferenciar produto, contexto e variante, permitindo que o usuário consulte um contexto ativo e que usuários autorizados o mantenham com status e histórico compreensíveis.

## Escopo

### Incluído

- exibir os atributos públicos do `GameContext` no catálogo e no detalhe do produto quando a API os fornecer;
- preservar a distinção visual entre dados do produto e dados do contexto;
- consultar somente contextos ativos na jornada pública;
- criar e editar contextos para usuários autorizados, incluindo status, versão e atributos de auditoria somente leitura;
- apresentar mensagens acionáveis quando a API rejeitar contexto incompleto, incompatível ou não publicável;
- permitir consultar o histórico/snapshots de um contexto para fins de auditoria, quando esse recurso estiver disponível no contrato da API;
- manter navegação, busca, paginação, imagens e carrinho compatíveis com o fluxo atual.

### Fora do escopo

- criar ou alterar a entidade `Offer`;
- definir preço, estoque ou disponibilidade próprios da variante;
- associar produto/oferta a um contexto sem contrato aprovado pelo PLAN-002;
- implementar regras de compatibilidade no navegador;
- substituir `Product` por uma entidade de contexto ou duplicar regras da API;
- permitir vendas ou novas ofertas para contextos inativos/descontinuados;
- decidir vocabulários controlados para game, publisher, plataforma, região ou servidor.

## Usuários e jornadas

### Cliente/visitante — consultar contexto de uma oferta

1. Acessa o catálogo público.
2. Visualiza, junto ao produto, um resumo do contexto: game e plataforma; região, servidor e variante quando informados.
3. Abre o detalhe para consultar todos os atributos disponíveis e o estado de publicação retornado pela API.
4. Adiciona ao carrinho somente quando a oferta estiver disponível; a decisão final permanece no backend.

O catálogo público não deve listar contexto inativo ou descontinuado como opção de venda. Caso um registro histórico seja retornado por uma consulta de detalhe, ele deve ser identificado como não disponível e não pode habilitar uma nova compra.

### Operador autorizado — manter contexto

1. Acessa a área administrativa protegida.
2. Lista contextos ativos com busca e paginação; filtros por status podem existir quando suportados pela API.
3. Cria ou edita game, plataforma, publisher, região, servidor, variante e status.
4. Recebe validação de campos obrigatórios e combinações incompatíveis antes de concluir a operação, sem substituir a validação definitiva do backend.
5. Consulta versão, datas, usuário da alteração e snapshots históricos em modo somente leitura.
6. Ao descontinuar um contexto, vê uma confirmação explícita de que o registro será preservado para referências históricas.

## Requisitos funcionais

### RF-001 — Modelo público de contexto

O frontend deve representar o `GameContext` separado de `Product`, com pelo menos `id`, `version`, `game`, `platform`, `publisher`, `region`, `server`, `variant`, `status`, `createdAt` e `modifiedAt`, conforme o contrato efetivo da API. Campos opcionais ausentes não devem aparecer como valores inventados.

### RF-002 — Exibição no catálogo e detalhe

Quando o contrato de catálogo retornar contexto, a listagem e o detalhe devem exibir game e plataforma de forma destacada e os demais atributos em uma área identificável de contexto. A tela deve continuar distinguindo nome, descrição, preço, inventário e imagens do produto.

### RF-003 — Contexto ativo e histórico

A jornada pública deve consumir contextos `ACTIVE`. Os estados `INACTIVE` e `DISCONTINUED` podem ser exibidos em telas administrativas e históricos, mas devem ser sinalizados e não podem habilitar adicionar ao carrinho ou iniciar uma nova oferta.

### RF-004 — CRUD administrativo

Usuários autorizados devem ter telas para listar, criar, consultar e atualizar contextos conforme os endpoints autorizados pela API. A UI deve respeitar autenticação, autorização e códigos de resposta do backend; não deve assumir que todo usuário autenticado pode mutar contextos.

### RF-005 — Validação e erros

A UI deve validar presença de `game` e `platform`, exigir `region` quando `server` for informado e impedir edição de contexto `DISCONTINUED`. Erros de domínio retornados pela API devem ser convertidos em mensagens próximas ao formulário e em uma mensagem geral quando necessário, preservando o motivo acionável.

### RF-006 — Versionamento e auditoria

A versão atual, datas de criação/alteração e usuário autenticado associado à alteração devem ser somente leitura. O frontend não deve permitir editar snapshots nem apagar contextos ou histórico.

### RF-007 — Compatibilidade com os fluxos existentes

A consulta do contexto não deve quebrar busca, paginação, carregamento de imagens, detalhe, carrinho ou checkout. Enquanto a associação com `Offer` não estiver disponível, a UI deve tratar a ausência de contexto como estado de contrato/indisponibilidade claramente identificado, sem fabricar dados.

## Requisitos não funcionais

- manter Angular 17, `NgModule`, strict mode, PrimeNG e os padrões de modelos/serviços existentes;
- usar `environment.baseUrl` e os serviços HTTP existentes, sem URLs hard-coded em componentes;
- proteger IDs em URLs e manter paginação com `page`, `size` e `search`;
- não exibir tokens, credenciais ou detalhes internos de autorização;
- oferecer estados de carregamento, vazio, erro, salvamento e conflito de versão;
- manter acessibilidade básica: rótulos associados, estados comunicados e ações desabilitadas com motivo compreensível;
- não depender de enums rígidos para valores ainda extensíveis de publisher, região, servidor ou variante.

## Contrato esperado com a API

O frontend depende de um contrato aprovado no backend para:

| Capacidade | Expectativa da UI |
|---|---|
| Listagem pública | Retorna somente `ACTIVE`, paginada e pesquisável; cada item pode incluir o contexto ou uma referência estável a ele |
| Detalhe | Retorna produto e contexto diferenciados, com status e versão quando aplicável |
| Administração | Endpoints protegidos por JWT/role `ADMIN`, com respostas de validação e conflito de versão |
| Histórico | Retorna snapshots imutáveis, ordenados e identificados por versão/data |
| Descontinuação | Impede novos usos e preserva consulta histórica; não exige exclusão física |

O contrato definitivo deve ser confirmado nos controllers, DTOs, mappers e schema da API antes da implementação. A associação obrigatória de uma oferta ao contexto e o snapshot consumido por pedidos são responsabilidade do PLAN-002.

## Critérios de aceite

- **AC1 — Diferenciação:** dado um item com contexto, catálogo e detalhe mostram produto, contexto e variante em áreas distintas, sem misturar contexto com preço, estoque ou imagem.
- **AC2 — Consulta pública:** dado um contexto `ACTIVE`, o cliente consegue consultar game e plataforma e, quando presentes, publisher, região, servidor e variante.
- **AC3 — Proteção de estados:** dado um contexto `INACTIVE` ou `DISCONTINUED`, a UI não oferece ação de nova compra/oferta e informa o estado; o histórico permanece consultável para usuários autorizados.
- **AC4 — Administração:** dado um usuário autorizado, é possível criar e editar contexto com os campos definidos pelo contrato, consultar versão/auditoria e ver confirmação antes de descontinuar.
- **AC5 — Validação:** dado servidor sem região, game/plataforma ausentes ou tentativa de editar contexto descontinuado, a UI bloqueia o envio ou apresenta erro acionável; a API continua sendo a autoridade final.
- **AC6 — Erros do backend:** dado um `4xx` de incompatibilidade, autorização ou conflito de versão, a tela informa a causa sem perder silenciosamente os dados preenchidos.
- **AC7 — Compatibilidade:** catálogo, detalhe, imagens, carrinho e checkout continuam funcionando para respostas compatíveis sem contexto, durante a transição coordenada da API.
- **AC8 — Qualidade:** testes de componente/serviço cobrem estados `ACTIVE`, `INACTIVE`, `DISCONTINUED`, contexto incompleto, erro de API e preservação dos fluxos de catálogo.

## Dados e estados de interface

| Estado de domínio | Exibição pública | Exibição administrativa | Ações permitidas |
|---|---|---|---|
| `ACTIVE` | Contexto visível e disponível | Editar conforme autorização | Consultar; associar somente quando o contrato de oferta permitir |
| `INACTIVE` | Não listar como opção de venda; sinalizar se detalhe histórico exigir | Visível com status | Consultar; reativar conforme regra da API |
| `DISCONTINUED` | Não vender nem oferecer como novo contexto | Visível como terminal | Consultar histórico; nenhuma edição de atributos |

Estados técnicos de carregamento, vazio, erro, salvamento e conflito devem seguir o padrão de mensagens e skeletons já usado pelas telas de catálogo e manutenção de produto.

## Dependências, riscos e decisões

**Dependências:** endpoint e payload públicos de `GameContext`; endpoint administrativo; regra de autorização; formato de erro; política de paginação; associação de contexto ao catálogo/oferta no PLAN-002.

**Riscos:** o catálogo atual recebe somente `Product`; uma migração parcial pode produzir itens sem contexto ou duplicar campos. A mitigação é aceitar a ausência durante a transição, mapear o contexto em modelo próprio e remover campos duplicados somente após contrato coordenado.

**Decisões pendentes:** formato final da referência no catálogo; filtros públicos; vocabulários e labels amigáveis; endpoint e paginação do histórico; comportamento para uma oferta antiga sem contexto; momento de habilitar a ação de associação a `Offer`.

## Evidências esperadas

- testes unitários de modelos/serviços para mapeamento de contexto e estados;
- testes de componentes para catálogo, detalhe, formulário administrativo, validações e mensagens de erro;
- teste de contrato com payloads da API para contexto ativo, inativo e descontinuado;
- `npm run build` e `npm run test-headless` no `ui-marketplace`;
- revisão de `git diff` confirmando que a mudança de UI não introduz segredos nem altera o schema gerador sem necessidade.

