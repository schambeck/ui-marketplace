# PRD-006 — Confirmação de pagamento no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-006-confirmacao-pagamento.md` · Payment · Essencial  
**Dependência:** pedido e contrato do Mercado Pago.

## Problema e objetivo

O retorno do pagamento pode ser duplicado, atrasado ou incompatível com o pedido. A UI deve comunicar o estado confirmado pelo backend, sem interpretar o redirect como pagamento aprovado.

## Escopo

- tela de retorno que consulta o pedido/pagamento no backend;
- estados de aguardando, aprovado, recusado, falho, revisão e retry;
- ação segura para atualizar status e retornar ao pedido;
- mensagens sem tokens, assinaturas ou payloads sensíveis.

## Critérios de aceite

- Redirect duplicado não cria pedido nem altera estado local indevidamente.
- Notificação inválida ou divergente aparece como pendente/revisão, nunca como aprovado.
- Pagamento aprovado mostra a próxima etapa prevista (reserva, risco ou fulfillment).
- Falha transitória oferece retry sem reenviar cobrança automaticamente.
- O histórico do pedido diferencia estado confirmado de mera tentativa do navegador.
- Testes cobrem retorno direto, refresh, atraso, recusa, duplicata e erro de API.

## Limites

Autenticidade, idempotência, reconciliação e transição de domínio são da API. A UI não recebe nem armazena credenciais do gateway.

