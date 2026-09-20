# PRD-014 — Risco e revisão manual no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-014-risco.md` · Risk · Importante  
**Dependência:** pedido, pagamento, fulfillment e autorização operacional.

## Problema e objetivo

Pedidos sinalizados podem avançar sem que um operador entenda o motivo ou registre uma decisão. A UI deve apresentar sinais minimizados e permitir revisão segregada e auditável.

## Escopo

- fila de avaliações `HOLD`, `BLOCK` e `ESCALATE`;
- consulta de política/versão e motivos aplicados;
- liberar, bloquear ou escalar com justificativa quando autorizado;
- histórico de sinais, evidências e decisões sem expor dados desnecessários.

## Critérios de aceite

- Pedido em `HOLD` aparece como não liberado para fulfillment.
- Revisor autorizado pode decidir com motivo obrigatório e confirmação.
- Usuário sem permissão não vê sinais sensíveis nem executa a decisão.
- Repetição da ação mostra a decisão vigente e não cria nova transição indevida.
- Mudança de política indica a versão aplicada ao pedido histórico.
- Testes cobrem hold, allow/block/escalate, segregação, conflito e falha do provedor.

## Limites

Thresholds, sinais, retenção, score e integração externa são políticas da API. A UI não calcula risco nem transforma ausência de sinal em aprovação automática.

