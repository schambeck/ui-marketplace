# PLAN-015 — Regras por game e publisher no frontend

**PRD:** [`PRD-015`](../prd/PRD-015-regras-game-publisher.md)  
**Plano relacionado:** [`api-marketplace PLAN-015`](../../../api-marketplace/docs/plan/PLAN-015-regras-game-publisher.md)  
**Dependências:** `GameContext`, `Offer`, delivery, fulfillment e `RuleSet` versionado.

## Estado atual e alvo

O frontend não possui manutenção de regras nem formulário orientado por contexto. O alvo é apresentar campos, limites, métodos e janelas exigidos e permitir administração versionada, deixando a decisão definitiva no backend.

## Abordagem técnica

Criar modelos `RuleSet`, versão, escopo e avaliação; serviço; feature `rules-screen` protegida. Criar renderer de campos dinâmicos reutilizável no checkout/instruções e componente de explicação de bloqueio/revisão. Snapshots de regra do pedido serão somente leitura.

## Sequência e validação

Fechar schema e precedência; implementar consulta/CRUD autorizado; integrar publicação; integrar checkout e fulfillment; exibir versão aplicada; testar regra ausente/expirada/conflitante, limites, novas vendas e pedido histórico.

## Riscos e rollback

Duplicar o engine no navegador pode divergir. Validações locais ficam restritas a formato/presença, com revalidação da API. Rollback remove renderer/feature sem apagar snapshots.

