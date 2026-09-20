# PLAN-014 — Risco e revisão manual no frontend

**PRD:** [`PRD-014`](../prd/PRD-014-risco.md)  
**Plano relacionado:** [`api-marketplace PLAN-014`](../../../api-marketplace/docs/plan/PLAN-014-risco.md)  
**Dependências:** order, payment, fulfillment, autorização e política versionada.

## Estado atual e alvo

Não existe fila de revisão de risco. O alvo é permitir que revisores autorizados consultem decisão, sinais minimizados e versão da política, decidam ou escalem com motivo obrigatório.

## Abordagem técnica

Criar modelos de avaliação, sinal, política e revisão; serviço; feature `risk-review-screen` com fila, detalhe e comandos. Aplicar `AuthGuard`/autorização, ocultar dados desnecessários e atualizar a tela após conflito. Não calcular score no navegador.

## Sequência e validação

Fechar roles e estados; implementar consulta; exibir motivo/política; adicionar liberar/bloquear/escalar; integrar bloqueio visual do fulfillment; testar hold, repetição, decisão concorrente, falha do provider e segregação.

Aceite: HOLD não mostra execução liberada; decisão exige motivo; sinais preservados; versão identificável. Validar contrato controlado, build e testes headless.

## Riscos e rollback

Exposição de sinal sensível e aprovação por ausência são riscos críticos. A UI só apresenta decisão explícita do backend. Rollback: retirar comandos e manter consulta mínima de status.

