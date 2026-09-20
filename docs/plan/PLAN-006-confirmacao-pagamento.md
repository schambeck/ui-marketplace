# PLAN-006 — Confirmação de pagamento no frontend

**PRD:** [`PRD-006`](../prd/PRD-006-confirmacao-pagamento.md)  
**Plano relacionado:** [`api-marketplace PLAN-006`](../../../api-marketplace/docs/plan/PLAN-006-confirmacao-pagamento.md)  
**Dependências:** `Order`, `PaymentService`, Mercado Pago e endpoint de consulta de status.

## Estado atual e alvo

`payment-screen` trata o retorno do SDK, mas o navegador não é fonte de verdade. O alvo é consultar pedido/pagamento no backend e comunicar estados pendentes, aprovados, recusados, falhos ou em revisão sem repetir cobrança.

## Abordagem técnica

Revisar `payment.component`, `payment.service`, `preference.service`, rotas de retorno e modelos de payment. Adicionar consulta idempotente por `orderId`, estados de loading/retry e mensagens específicas. Não transportar webhook, assinatura ou payload sensível para a UI.

## Sequência e evidência

1. Confirmar referência pública e estados do contrato.
2. Separar retorno do gateway de confirmação do backend.
3. Implementar polling/reconsulta limitada e ação manual de atualizar.
4. Integrar timeline do pedido e próxima etapa.
5. Testar refresh, retorno duplicado, atraso, recusa, divergência e erro.

O aceite será demonstrado por specs de componente/serviço, teste de contrato controlado, `npm run build` e `npm run test-headless`.

## Riscos e rollback

Polling excessivo e falsa aprovação são os riscos principais. Usar backoff/limite e somente status confirmado. Rollback: preservar tela de retorno compatível, removendo apenas a nova apresentação de estados.

