# PRD-004 — Inventory, reserva e consumo no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-004-inventory.md` · Inventory · Essencial  
**Dependência:** oferta, pedido, supply e contrato de reserva.

## Problema e objetivo

Quantidade editável no produto não explica reserva, expiração, alocação ou consumo. Cliente e operador precisam receber estados coerentes sem que a UI tente resolver concorrência.

## Escopo

- mostrar disponibilidade efetiva no catálogo, carrinho e checkout;
- informar reserva pendente, expirada, liberada ou insuficiente;
- oferecer telas operacionais para consultar reserva, alocação, movimentos e expiração;
- refletir entrega parcial sem marcar consumo integral.

## Critérios de aceite

- Duas tentativas concorrentes resultam em uma mensagem clara para a que não obteve reserva.
- Reserva com TTL exibe prazo/estado e não permite checkout após expiração.
- Pedido pago sem reserva válida não aparece como pronto para fulfillment.
- Cancelamento libera saldo não consumido sem apagar o histórico exibido ao operador.
- A UI não afirma disponibilidade com base em cache antigo e atualiza após conflito.
- Testes cobrem `AVAILABLE`, `RESERVED`, `ALLOCATED`, `CONSUMED`, `RELEASED` e `EXPIRED`, além de erro e idempotência.

## Limites

Locking, overselling, scheduler e ledger são responsabilidades da API. A granularidade final (saldo, unidade ou código) deve ser refletida pelo contrato antes da implementação.
