# PLAN-004 — Inventory, reserva e consumo no frontend

**PRD:** [`PRD-004`](../prd/PRD-004-inventory.md)  
**Plano relacionado:** [`api-marketplace PLAN-004`](../../../api-marketplace/docs/plan/PLAN-004-inventory.md)  
**Dependências:** oferta, pedido, supply, fulfillment e contrato de inventory.

## Estado atual e alvo

O frontend ainda recebe quantidade/status de produto e não possui visão de reserva ou movimentos. O alvo é mostrar disponibilidade efetiva ao cliente e fornecer uma console operacional para reserva, alocação, expiração e consumo.

## Abordagem técnica

Adicionar modelos para estado, reserva, alocação e movimento; `inventory.service.ts`; e feature protegida `inventory-screen`. Integrar catálogo, carrinho e checkout para atualizar disponibilidade após erro de reserva, expiração ou conflito. Não calcular saldo localmente nem simular locking.

Arquivos previstos: `shared/model`, `shared/service`, `feature/inventory-screen`, rotas/sidebar e specs. O formato final depende de o backend expor saldo, unidade ou código; códigos sensíveis nunca serão exibidos fora do escopo autorizado.

## Sequência e validação

1. Definir granularidade, TTL, estados e payloads.
2. Implementar serviço e console de consulta.
3. Integrar mensagens de reserva/expiração ao carrinho e checkout.
4. Integrar alocação/consumo à visão operacional.
5. Testar concorrência representada por `409`, idempotência, parcial e autorização.

Evidências: estados `AVAILABLE` a `EXPIRED`; reserva expirada bloqueia checkout; pedido sem reserva não é mostrado como pronto; cancelamento informa liberação; build/testes passam.

## Riscos e rollback

Cache obsoleto pode prometer disponibilidade. Usar resposta do backend como autoridade e atualizar após mutação. Rollback: retirar componentes de inventory e voltar a mensagens de indisponibilidade sem mudar o contrato de catálogo.

