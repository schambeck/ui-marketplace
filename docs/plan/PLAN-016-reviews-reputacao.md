# PLAN-016 — Reviews e reputação no frontend

**PRD:** [`PRD-016`](../prd/PRD-016-reviews-reputacao.md)  
**Plano relacionado:** [`api-marketplace PLAN-016`](../../../api-marketplace/docs/plan/PLAN-016-reviews-reputacao.md)  
**Dependências:** decisão de MVP, order concluído, oferta, moderação e rating derivado.

## Estado atual e alvo

`Product.rating` existe, mas não há review, elegibilidade ou moderação no frontend. Se o recurso for aprovado, o alvo é criar uma experiência baseada em transação, exibir somente conteúdo publicável e separar moderação da consulta pública.

## Abordagem técnica

Criar modelos de review, versão, moderação e agregated rating; serviço; componente de convite/formulário; lista pública; e feature protegida de moderação. Substituir gradualmente o uso de `Product.rating` por resposta derivada do contrato, sem manter duas fontes.

## Sequência e validação

Confirmar objeto/janela/anonimização; implementar elegibilidade e formulário; consulta pública; edição versionada; denúncia/moderação; integração de rating. Testar inelegível, duplicidade, edição, ocultação, contestação, recálculo e estados vazios.

## Riscos e rollback

Review fora da transação e conteúdo oculto são riscos de confiança. Exibir apenas estado autorizado e nunca apagar histórico localmente. Se o MVP for adiado, manter `Product.rating` compatível e não expor entrada de avaliação.

