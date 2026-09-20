# PLAN-010 — Refund, disputa e chargeback no frontend

**PRD:** [`PRD-010`](../prd/PRD-010-pos-venda-financeiro.md)  
**Plano relacionado:** [`api-marketplace PLAN-010`](../../../api-marketplace/docs/plan/PLAN-010-pos-venda-financeiro.md)  
**Dependências:** order/payment, delivery/evidence, support e gateway.

## Estado atual e alvo

Não há jornada de refund ou disputa. O alvo é permitir solicitação, acompanhamento e operação autorizada, distinguindo pedido recebido, decisão e confirmação externa.

## Abordagem técnica

Criar modelos/serviço de refund, dispute e evidence link; adicionar componentes de solicitação e detalhe; integrar timeline de pedido e suporte; proteger anexos e ações por role. O formulário deve exibir valor elegível retornado pela API e impedir valores arbitrários fora do contrato.

## Sequência e validação

Confirmar política/estados; implementar consulta e solicitação; adicionar integral/parcial; criar disputa e anexos; integrar retry/revisão e identificador externo; testar inelegível, duplicata, falha gateway, congelamento e autorização.

Validar com payloads de teste, `npm run build` e `npm run test-headless`. Nunca usar credenciais ou dados reais de pagamento.

## Riscos e rollback

Falso sucesso e exposição financeira são críticos: mostrar somente confirmação do backend e mascarar dados. Remover ações de solicitação é rollback; histórico de pedidos continua somente leitura.

