# PRD-009 — Exceções, timeout e cancelamento no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-009-excecoes-cancelamento.md` · Exceptions · Importante  
**Dependência:** pedido, inventory, pagamento, fulfillment e delivery.

## Problema e objetivo

Falhas, expirações, entregas parciais e cancelamentos deixam o usuário sem saber a próxima ação. A UI deve tornar cada exceção visível, acionável e consistente com a decisão do backend.

## Escopo

- timeline de exceção com prazo, responsável, motivo e próxima ação;
- ações de retry, reagendamento, troca de source, ação do cliente, cancelamento e revisão quando autorizadas;
- exibição de parcial e saldo pendente;
- confirmação explícita antes de ações irreversíveis.

## Critérios de aceite

- Carrinho, pedido e reserva expirados mostram estado e recurso liberado.
- Falha de entrega apresenta ação e deadline, sem esconder evidência anterior.
- Cancelamento informa impacto em inventory/refund e não promete conclusão antes da confirmação.
- Entrega parcial não é mostrada como concluída integralmente.
- Repetição de uma ação retorna o resultado atual sem duplicar operação.
- Testes cobrem timeout, retry, cancelamento, parcial, `409` e erro do gateway.

## Limites

Elegibilidade, scheduler, idempotência, refund e liberação de inventory pertencem à API; a UI apenas solicita e representa a decisão.

