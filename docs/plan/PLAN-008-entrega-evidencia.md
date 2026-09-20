# PLAN-008 — Instruções e evidência de entrega no frontend

**PRD:** [`PRD-008`](../prd/PRD-008-entrega-evidencia.md)  
**Plano relacionado:** [`api-marketplace PLAN-008`](../../../api-marketplace/docs/plan/PLAN-008-entrega-evidencia.md)  
**Dependências:** ruleset, order, fulfillment e object storage autorizado.

## Estado atual e alvo

Checkout e fulfillment não possuem formulário contextual nem registro de evidência. O alvo é renderizar instruções conforme contrato, versionar correções e permitir confirmação/contestação sem apagar tentativas.

## Abordagem técnica

Criar modelos de schema/instrução, tentativa, resultado e evidência; serviço dedicado; componentes de formulário dinâmico e timeline. Integrar upload por `ObjectStorageService` usando referências temporárias e autorização. Reutilizar mensagens/interceptor existentes e manter dados sensíveis fora de logs.

## Sequência e validação

1. Fechar campos, métodos, consentimento e versão.
2. Implementar formulário e validação de presença/formato.
3. Persistir correção como nova versão antes da execução.
4. Criar visão operacional minimizada e upload/consulta de evidência.
5. Adicionar confirmação/contestação do cliente.

Testar instrução inválida, escopo por papel, tentativa total/parcial/falha, upload expirado, contestação e histórico imutável; executar build/testes.

## Riscos e limites

Não armazenar segredo nem URL pública permanente. Retenção, checksum, consentimento e campos específicos são da API; se o storage não estiver disponível, exibir estado pendente sem marcar entrega concluída.

