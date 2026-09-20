# PLAN-013 — Reconciliação e settlement no frontend

**PRD:** [`PRD-013`](../prd/PRD-013-reconciliacao.md)  
**Plano relacionado:** [`api-marketplace PLAN-013`](../../../api-marketplace/docs/plan/PLAN-013-reconciliacao.md)  
**Dependências:** order, gateway, delivery, inventory, refund, supply e segregação financeira.

## Estado atual e alvo

Não há console de reconciliação. O alvo é permitir execução/consulta de períodos, investigação de itens, evidência, responsável, aceite e fechamento, sem edição destrutiva.

## Abordagem técnica

Criar modelos `ReconciliationRun`, item, evidence, adjustment e decision; serviço com filtros, paginação e comandos protegidos; feature `reconciliation-screen`. Exibir links somente para registros de origem autorizados e separar leitura de decisão/fechamento.

## Sequência e validação

Definir moeda/timezone/escopo; implementar listagem de runs; detalhe com filtros por severidade/status; investigação/evidência; aceite, ajuste e fechamento com confirmação; testar reprocessamento, item crítico, `403`, vazio e erro.

Evidências: totais e itens coerentes, fechamento bloqueado quando necessário, reprocessamento sem duplicação visual e ajustes como novos lançamentos. Validar build/testes.

## Riscos e limites

A UI não calcula ledger/payable nem decide política contábil. Dados financeiros precisam de máscara e roles. Rollback remove somente a console e mantém endpoints/execuções no backend.

