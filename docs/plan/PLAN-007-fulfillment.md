# PLAN-007 — Fulfillment e operação no frontend

**PRD:** [`PRD-007`](../prd/PRD-007-fulfillment.md)  
**Plano relacionado:** [`api-marketplace PLAN-007`](../../../api-marketplace/docs/plan/PLAN-007-fulfillment.md)  
**Dependências:** order, inventory, risk, delivery e autorização operacional.

## Estado atual e alvo

Não há fila de fulfillment ou tela de execução. O alvo é uma feature operacional com jobs elegíveis, claim/lease, prioridade, SLA, tentativas e eventos; o cliente vê apenas andamento e resultado.

## Abordagem técnica

Criar modelos `FulfillmentJob`, assignment/event e serviço HTTP. Criar `fulfillment-screen` com fila, detalhe, ações assumir/iniciar/concluir/falhar/reatribuir/escalar, confirmação e histórico. Adicionar rota/menus protegidos por role e componentes de status reutilizáveis para pedido.

A UI deve enviar comandos idempotentes, tratar conflito de claim e não mostrar instruções além do escopo retornado. Não alterar pedido diretamente.

## Sequência e validação

Fechar elegibilidade e roles; criar serviço/modelos; listar fila; implementar detalhe/comandos; integrar timeline do cliente; cobrir claim concorrente, timeout, falha, reatribuição e `403`.

Evidência: somente pedido elegível aparece; claim concorrente não duplica trabalho; conclusão/falha preserva evento; cliente não vê dados internos; build e testes headless passam.

## Riscos e rollback

Exposição de dados operacionais e ações duplicadas exigem minimização de payload e confirmação do estado após cada comando. Remover a rota operacional é rollback suficiente; o contrato backend não deve ser alterado pela UI.

