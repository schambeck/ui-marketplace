# PLAN-012 — Comunicação de eventos no frontend

**PRD:** [`PRD-012`](../prd/PRD-012-comunicacao.md)  
**Plano relacionado:** [`api-marketplace PLAN-012`](../../../api-marketplace/docs/plan/PLAN-012-comunicacao.md)  
**Dependências:** order, payment, delivery, refund e preferências de comunicação.

## Estado atual e alvo

Não há central de comunicações de lifecycle. O alvo é exibir mensagens relevantes do próprio pedido, preferências permitidas e estado de entrega/reenvio sem acoplar a UI ao provedor externo.

## Abordagem técnica

Criar modelos `NotificationDelivery`/preference e serviço. Adicionar `communication-screen` ou painel no detalhe do pedido, com estados lidos/não lidos, canal, versão e ação. Operação de reenvio ficará em componente protegido; a UI não dispara provider diretamente.

## Sequência e validação

Fechar eventos/canais/templates; implementar consulta paginada; adicionar preferências; integrar links de ação ao pedido; adicionar reenvio e mensagens de falha. Testar deduplicação exibida, opt-out, retry, autorização e ausência/vazio.

Critérios serão ligados a specs de serviço/componente, teste de contrato e build/testes headless.

## Riscos e limites

Outbox, idioma, retry e entrega real são backend. Não exibir segredo nem duplicar eventos no cliente; falha de comunicação nunca deve bloquear uma tela de pedido.

