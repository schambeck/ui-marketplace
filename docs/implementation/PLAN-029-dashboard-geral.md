# Dashboard geral — implementação e contratos

## Entrega

`/home` permanece pública e adapta a experiência ao login e aos papéis normalizados do Keycloak: ADMIN tem precedência sobre SELLER; demais autenticados recebem a visão de comprador. Visitantes não disparam consultas privadas. Nenhuma alteração de backend, autenticação, interceptador, dependência ou rota foi necessária.

- **Administrador:** totais de usuários e produtos, total de solicitações pendentes, atenção necessária e as cinco solicitações pendentes mais antigas (fila de análise, não log de auditoria ou atividades recentes).
- **Vendedor:** total dos próprios produtos e contagens completas de ofertas em DRAFT, PUBLISHED, PAUSED e RETIRED. Gráfico de barras por publicação e percentual de cada estado sobre a soma dos quatro estados. Não usa disponibilidade como sinônimo de publicação. Pausas não são classificadas como erro.
- **Comprador:** total de seus pedidos e até cinco pedidos mais recentes, em qualquer estado, com valor e link de detalhes. Valores em BRL seguem o padrão monetário existente da aplicação; não representam receita recebida.
- **Visitante:** atalhos para catálogo e acesso aos pedidos, cujo guard existente solicita autenticação.

Os KPIs distinguem carregamento (skeleton), zero, sucesso e erro com nova tentativa. A atualização cancela subscriptions anteriores e é cancelada na destruição da página. Cada consulta falha independentemente. O gráfico só apresenta percentuais quando todos os estados foram carregados; falhas não viram zero. As seções sem contratos suficientes informam a limitação, sem valores simulados. Não há dependências de gráficos novas: barras HTML/CSS acessíveis, com valores textuais e tooltips nativos.

## Discovery / classificação dos indicadores

| Indicador | Classificação | Fonte e restrições |
| --- | --- | --- |
| Total de usuários | Disponível diretamente | GET `/users?page=0&size=1`, `totalElements`; consultado apenas na experiência administrativa |
| Novos usuários no período | Dependente de novo endpoint | Datas nos registros não substituem uma contagem filtrada global |
| Vendedores aprovados | Dependente de novo endpoint | Fila de solicitações só retorna PENDING, não lista vendedores aprovados |
| Solicitações pendentes | Disponível diretamente | GET `/seller-applications?page=0&size=5`, `totalElements`; ADMIN no backend |
| Total de produtos da plataforma | Disponível diretamente | GET `/products?page=0&size=1`, `totalElements`; atalho existente abre apenas os próprios produtos |
| Total dos próprios produtos | Disponível diretamente | GET `/products/user?page=0&size=1`, escopo por principal no backend |
| Produtos disponíveis/indisponíveis | Dependente de novo endpoint | Sem filtro agregado de disponibilidade; não inferir a partir de uma página ou quantidade |
| Ofertas próprias por publicação | Disponível diretamente | GET `/seller/offers?page=0&size=1&status=…`, uma consulta para cada estado real |
| Total de ofertas próprias e percentuais por status | Calculável com dados existentes | Soma dos quatro totais disjuntos e percentual `contagem / soma * 100`, sem divisão por zero |
| Ofertas globais por publicação | Dependente de novo endpoint | `/admin/offers/{id}` só consulta por ID; `/offers` só lista publicadas e disponíveis |
| Ofertas indisponíveis | Dependente de novo endpoint | Sem filtro agregado por disponibilidade na API de proprietário |
| Total de compras do usuário | Disponível diretamente | GET `/orders?page=0&size=5`, `totalElements`; escopo por comprador no backend |
| Pedidos globais, por status e pedidos do vendedor | Dependente de novo endpoint | `/orders` retorna somente compras do principal, mesmo para ADMIN |
| Evolução dos pedidos | Dependente de novo endpoint | OrderWeb não expõe createdAt; histórico não deve ser tratado como campo de criação e uma página não representa o universo |
| Valor elegível e ticket médio | Dependente de novo endpoint | Requer definição de elegibilidade, moeda, período e agregação no servidor |
| Receita efetivamente recebida / conversão | Indisponível no modelo atual do dashboard | Nenhum contrato de consolidação de recebíveis, estornos ou denominador de conversão |
| Estoque global / produtos sem estoque | Dependente de novo endpoint | Inventário só consultável por pedido; não há listagem global de saldos |
| Fila de solicitações | Disponível diretamente | `pending` ordena `submittedAt ASC`; mostrar até cinco mais antigas |
| Compras recentes | Disponível diretamente | Repositório ordena por criação DESC, mas DTO não expõe a data; não inventar data |
| Eventos/auditoria globais | Indisponível no modelo atual | Não há feed global de eventos |

## Tempo e consistência

Os indicadores entregues representam **estado atual / total histórico cadastral**, sem período. Não há seletor 7/30/90 dias, comparação com período anterior, séries temporais, variação percentual temporal ou filtro de estoque por data. Os percentuais do gráfico são participações no total atual, não variações.

`SellerApplication.submittedAt` é `LocalDateTime`, sem offset/fuso no contrato. A UI preserva os componentes de data/hora e identifica “Horário do servidor (fuso não informado)”. Registros sem data não recebem uma data fictícia. Datas de criação de pedidos não são inferidas do histórico. O horário da última consulta usa o dispositivo e é identificado como tal; indica término das consultas, inclusive quando houve falha parcial. As contagens de status são chamadas separadas: sob mutações simultâneas não existe garantia de snapshot transacional; um endpoint agregado deve fornecer essa garantia.

## Autorização

O serviço seleciona quais recursos consultar antes de qualquer requisição. Compradores e visitantes não fazem chamadas administrativas ou de vendedor. A API protege solicitações por ADMIN e ofertas de vendedor por SELLER/ADMIN e principal proprietário. Pedidos e produtos próprios mantêm o escopo imposto pelo servidor. O dashboard administrativo não reutiliza compras pessoais como totais de operação.

**Limitação preexistente:** `/users` e `/products` exigem autenticação no SecurityConfig, mas não possuem restrição ADMIN no backend. O dashboard restringe suas consultas globais à experiência ADMIN; isso não substitui autorização do servidor. Endurecer esses endpoints requer uma alteração de backend separada, fora do escopo autorizado. O Keycloak no frontend usa a normalização de papéis existente; o backend usa realm roles.

## Arquitetura / arquivos

- `home/home.component.{ts,html,css}`: orquestração, estados da página, ações e layout com tokens existentes.
- `dashboard/dashboard.model.ts`: contratos de apresentação tipados.
- `dashboard/dashboard.service.ts`: integração com serviços existentes, escolha de perfil e falhas independentes.
- `dashboard/kpi-card.component.ts`: KPI reutilizável com carregamento/erro/zero.
- `dashboard/offer-chart.component.ts`: distribuição de publicação das ofertas próprias.
- `dashboard/quick-actions.component.ts`: atalhos contextuais por perfil.
- `home-screen.module.ts`: declarações NgModule compatíveis com Angular 17.
- `home/home.component.spec.ts`, `dashboard/dashboard.service.spec.ts`: testes de apresentação, integração por perfil, totais, percentuais, cancelamento e falhas.
- `shared/service/user.service.ts`: asserção de `baseUrl` alinhada aos serviços existentes, pois o ambiente base vazio é usado na compilação dos testes (builds substituem o ambiente).

## Contratos futuros propostos (não implementados)

Um novo endpoint agregado deve verificar autorização no servidor e agregar no banco, sem carregar todas as páginas no navegador.

`GET /admin/dashboard/summary?days=7|30|90&timezone=America/Sao_Paulo`

- Somente ADMIN; retornar `generatedAt` com offset, `asOf` do snapshot, `period` (`dateField`, `timezone`, `fromInclusive`, `toExclusive`) e estados explícitos de métricas não suportadas.
- Totais atuais de usuários, vendedores aprovados, solicitações pendentes, produtos por disponibilidade, ofertas por publicação **e separadamente** disponibilidade, inventário por unidade de medida definida.
- Pedidos por status real e série diária, incluindo dias sem pedidos com zero derivado da consulta completa; definir o tratamento de datas ausentes, por exemplo `excludedMissingDateCount`.
- Financeiro: `currency`, `eligibleStatuses`, `eligibilityRule`, `eligibleOrderCount`, `eligibleOrderAmount`, `averageEligibleOrderAmount` (nulo para zero pedidos) e série diária com a mesma semântica. Não chamar de receita sem dados de liquidação e estornos.
- O intervalo pode ser definido como dias civis locais incluindo hoje, do início do primeiro dia até o início de amanhã, com offset explícito em cada limite. A comparação anterior deve usar um intervalo adjacente de igual número de dias, documentando mudanças de horário de verão; variação nula quando o denominador for zero.
- Período afeta apenas métricas temporais definidas (campo de criação do pedido ou evento financeiro elegível), nunca totais atuais de cadastros, publicação ou estoque. Todas as séries e totais temporais devem compartilhar limites e regra de elegibilidade.

`GET /seller/dashboard/summary` deve derivar vendedor do principal e impor o escopo no servidor; retornar a mesma discriminação de publicação/disponibilidade e pedidos realmente vinculados às suas ofertas. Para compradores, extensão de OrderWeb com `createdAt` e timezone/offset explícito permitiria exibir datas, mas análises temporais completas ainda exigem agregação própria.

## Validação

A suíte cobre renderização de zero/vazio, moeda pt-BR, formatação de data sem conversão indevida de fuso, percentuais, estados de publicação, erros parciais, perfis, destinos dos links e cancelamento. Filtros temporais não são implementados por ausência de contrato. O teste de layout renderiza a visão de vendedor em iframes reais do ChromeHeadless com 375/768/1024/1440 px, verificando ausência de overflow horizontal e adaptação das colunas. A inspeção visual autenticada com dados reais de cada perfil ainda depende de ambiente com API/Keycloak. Não há script de lint no package.json.

Resultados: `npm run build` e `npm run build:prod` passaram; `npm run test-headless` passou com 42 testes; `git diff --check` sem erros. Produção mantém avisos de CommonJS do Keycloak/Mercado Pago e do tamanho do bundle inicial (1,63 MB acima do budget de aviso de 500 KB). Nenhum budget foi alterado.
