# PLAN-005 — Pedido e lifecycle no frontend

**PRD:** [`PRD-005`](../prd/PRD-005-pedido-lifecycle.md)  
**Plano relacionado:** [`api-marketplace PLAN-005`](../../../api-marketplace/docs/plan/PLAN-005-pedido-lifecycle.md)  
**Dependências:** checkout idempotente, `Offer`, payment e contrato de `Order`.

## Estado atual e alvo

O checkout atual cria preferência a partir do carrinho e não possui tela de pedido com snapshot. O alvo é criar/consultar um pedido por identificador público, mostrar linhas imutáveis e acompanhar o lifecycle sem usar o carrinho como histórico.

## Abordagem técnica

Criar `order.entity.ts`, item/snapshot/status/transition models e `order.service.ts`. Refatorar checkout para chamar o endpoint idempotente e navegar para `order/:id`; criar `order-screen` para cliente e visão operacional autorizada. Preservar `PaymentService` e o retorno do gateway por adaptadores de pedido.

Sequência: fechar estados/erros; criar serviço e specs; migrar checkout; criar timeline/detalhe; integrar payment, delivery, support e links de evidência; revisar guards e autorização.

## Validação

Testar criação com snapshot, refresh/reenvio sem duplicidade, estados válidos/inválidos, erro de contrato, acesso de outro usuário e preservação de preço/contexto. O aceite exige `npm run build`, `npm run test-headless` e teste de contrato com pedido controlado.

## Riscos e limites

Taxas, numeração, retenção e estados mínimos precisam de contrato. A UI não edita snapshot nem executa transições arbitrárias; rollback mantém checkout anterior atrás de feature flag/rota somente se a API permitir compatibilidade.

