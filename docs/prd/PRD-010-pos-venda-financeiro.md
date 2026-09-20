# PRD-010 — Refund, disputa e chargeback no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-010-pos-venda-financeiro.md` · After-sales · Importante  
**Dependência:** pedido, pagamento, entrega, evidências e contrato do gateway.

## Problema e objetivo

O cliente não possui uma jornada clara para solicitar reembolso ou acompanhar disputa, e o operador não tem uma visão controlada das evidências. A UI deve separar solicitação, decisão e confirmação financeira.

## Escopo

- solicitar refund integral/parcial com motivo e valor elegível;
- acompanhar pendente, aprovado, rejeitado, executando, concluído e falho;
- abrir/consultar disputa ou chargeback para papéis autorizados;
- anexar evidências com controle de acesso e histórico.

## Critérios de aceite

- Solicitação inelegível informa o motivo e não indica chamada ao gateway.
- O cliente vê que uma solicitação foi recebida, sem confundir envio com refund concluído.
- Refund confirmado mostra identificador externo e atualiza o pedido somente conforme API.
- Disputa congela ações conflitantes e permite acompanhar prazo/responsável.
- Retry de gateway não cria refund duplicado nem falso sucesso.
- Testes cobrem integral/parcial, inelegibilidade, duplicata, falha e anexos.

## Limites

Política, moeda, elegibilidade, execução gateway, reconciliação e retenção de evidências são decisões do backend. Nunca exibir credenciais ou resposta bruta do provedor.

