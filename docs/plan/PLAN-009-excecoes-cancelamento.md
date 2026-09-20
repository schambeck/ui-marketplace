# PLAN-009 — Exceções, timeout e cancelamento no frontend

**PRD:** [`PRD-009`](../prd/PRD-009-excecoes-cancelamento.md)  
**Plano relacionado:** [`api-marketplace PLAN-009`](../../../api-marketplace/docs/plan/PLAN-009-excecoes-cancelamento.md)  
**Dependências:** order, inventory, payment, fulfillment e delivery.

## Estado atual e alvo

Não há timeline ou comandos de exceção. O alvo é uma camada de apresentação para casos, deadlines e próxima ação, compartilhada por pedido, carrinho e fulfillment.

## Abordagem técnica

Criar modelos `ExceptionCase`, action/deadline e serviço. Adicionar componentes de timeline, confirmação e formulários de ação; integrar rotas de pedido, carrinho e operação. A UI deve atualizar o estado após cada comando e tratar repetição como leitura do estado atual.

## Sequência e validação

Fechar matriz de ações/roles; implementar serviço; integrar expiração de carrinho/reserva; adicionar retry/reagendamento/troca/cancelamento/revisão; representar parcial e refund pendente; cobrir `409`, timeout e falha externa.

Evidências: expiração visível, falha com responsável/deadline, cancelamento sem promessa prematura, parcial distinta de completa e testes de idempotência visual.

## Riscos e rollback

Ações irreversíveis devem exigir confirmação e resposta do backend. Não calcular elegibilidade localmente. Rollback: ocultar comandos novos mantendo consulta da timeline.

