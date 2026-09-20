# PRD-013 — Reconciliação e settlement no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-013-reconciliacao.md` · Finance · Importante  
**Dependência:** contratos de pedido, gateway, entrega, inventory, refund e supply.

## Problema e objetivo

Operadores financeiros não possuem uma visão investigável das divergências entre pedidos, pagamentos, entrega e refunds. A UI deve organizar execuções e evidências sem permitir edição destrutiva.

## Escopo

- iniciar/consultar execução por período e escopo, conforme permissão;
- filtrar itens conciliados, divergentes e não verificáveis;
- exibir severidade, origem, responsável, evidência e decisão;
- registrar aceite, ajuste ou fechamento conforme segregação de função.

## Critérios de aceite

- Execução mostra totais e itens com links para registros de origem autorizados.
- Divergência crítica bloqueia fechamento ou exige aceite explícito registrado.
- Reprocessamento do mesmo período não duplica ajustes na interface.
- Ajustes aparecem como novos lançamentos e não sobrescrevem o fato original.
- Cliente final não acessa dados financeiros operacionais.
- Testes cobrem filtros, paginação, reprocessamento, evidência e autorização.

## Limites e decisões

Moeda, timezone, periodicidade, nível contábil e settlement por supplier ainda dependem de decisão. A UI não calcula payable nem altera ledger localmente.

