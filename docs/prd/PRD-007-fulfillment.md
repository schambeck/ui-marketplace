# PRD-007 — Fulfillment e operação no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-007-fulfillment.md` · Fulfillment · Essencial  
**Dependência:** pedido pago, risco liberado, inventory alocado e instruções de entrega.

## Problema e objetivo

Não há uma jornada operacional para transformar pedidos elegíveis em trabalho executável. A UI deve oferecer fila, atribuição e acompanhamento sem permitir duas execuções simultâneas.

## Escopo

- fila protegida com contexto mínimo, prioridade, SLA e tentativas;
- assumir, iniciar, concluir, falhar, reatribuir e escalar conforme papel;
- timeline de eventos e motivo de falha/timeout;
- visão do cliente separada da visão operacional.

## Critérios de aceite

- Somente pedidos pagos, liberados e alocados entram na fila.
- Operador vê apenas instruções necessárias para executar a entrega.
- Claim concorrente informa que o trabalho já foi assumido, sem duplicar execução.
- Conclusão/falha exige resultado e preserva histórico; timeout gera próxima ação.
- Cliente vê andamento e resultado sem dados internos de source ou risco.
- Testes cobrem elegibilidade, claim, reatribuição, conclusão, falha e autorização.

## Dependências

Contrato de jobs, lease, roles, SLA, canais e integração com delivery/evidence. A UI não executa jobs nem altera o pedido diretamente.
