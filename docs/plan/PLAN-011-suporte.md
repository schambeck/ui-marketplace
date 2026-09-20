# PLAN-011 — Suporte e casos no frontend

**PRD:** [`PRD-011`](../prd/PRD-011-suporte.md)  
**Plano relacionado:** [`api-marketplace PLAN-011`](../../../api-marketplace/docs/plan/PLAN-011-suporte.md)  
**Dependências:** autorização, order, fulfillment, refund e dispute.

## Estado atual e alvo

Não existe módulo de suporte. O alvo é uma jornada de cliente para abertura/acompanhamento e uma fila operacional com classificação, atribuição, SLA, mensagens e reabertura controlada.

## Abordagem técnica

Criar `SupportCase`, message, assignment e deadline models e `support.service.ts`. Adicionar `support-screen` com lista/detalhe/formulário, rotas para cliente e operador e links contextuais a pedido/fulfillment. Filtrar mensagens e anexos no backend; a UI não deve inferir autorização.

## Sequência e validação

1. Fechar categorias, estados, canais, SLA e roles.
2. Implementar serviço e criação de caso.
3. Adicionar conversa e anexos permitidos.
4. Criar fila de operador, atribuição, resolução e reabertura.
5. Testar isolamento, paginação, mensagens, SLA, `403` e estados inválidos.

## Riscos e rollback

Conteúdo sensível e acesso cruzado são riscos principais. Minimizar payloads e testar usuário/operador separadamente. Rollback: retirar rotas/menus e manter links de erro sem apagar casos existentes.

