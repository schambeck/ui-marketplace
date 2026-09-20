# PRD-012 — Comunicação de eventos no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-012-comunicacao.md` · Communication · Importante  
**Dependência:** lifecycle de pedido, pagamento, entrega, refund e preferências.

## Problema e objetivo

O usuário não tem uma fonte confiável para acompanhar eventos da compra. A UI deve exibir comunicações relevantes, permitir preferências e distinguir mensagem entregue de evento de negócio.

## Escopo

- central de comunicações do próprio pedido;
- indicação de estado, ação necessária e referência do pedido;
- preferências/opt-out nos canais suportados;
- operação autorizada de consulta e reenvio seguro.

## Critérios de aceite

- Eventos elegíveis aparecem no máximo uma vez por canal/versão.
- Mensagem não expõe segredo e contém ação compreensível quando necessária.
- Falha de envio é visível ao operador e não desfaz pedido/pagamento.
- Cliente consulta apenas comunicações próprias e pode ajustar preferências permitidas.
- Reenvio não duplica a entrega lógica sem indicação explícita.
- Testes cobrem estados, deduplicação exibida, opt-out, erro e autorização.

## Limites

Outbox, templates, idioma, provedor, retry e deduplicação definitiva são responsabilidades da API. A UI não deve disparar comunicação diretamente no fluxo transacional.

