# PRD-005 — Pedido e lifecycle no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-005-pedido-lifecycle.md` · Transaction · Essencial  
**Dependência:** `Offer`, checkout idempotente e contrato de `Order`.

## Problema e objetivo

O checkout usa o carrinho como referência principal e não oferece ao cliente uma identidade estável da compra. A UI deve apresentar um pedido independente, com linhas, preço, contexto e estado congelados na criação.

## Escopo

- criar/consultar pedido a partir do checkout sem duplicação;
- exibir resumo imutável de itens, preço, quantidade, contexto e instruções;
- apresentar timeline de estados e referências de pagamento, entrega e suporte;
- permitir consulta do próprio pedido e telas operacionais autorizadas.

## Critérios de aceite

- Checkout válido cria um pedido e redireciona usando o identificador público do pedido.
- Repetição do envio ou retorno do gateway não cria um segundo pedido.
- Alterações posteriores da oferta não reescrevem o resumo do pedido.
- Estados inválidos ou transições indisponíveis exibem causa e próxima ação.
- O cliente só consulta seus pedidos; dados operacionais são filtrados por papel.
- Testes cobrem criação, repetição, estados, erro de validação e compatibilidade com o pagamento atual.

## Dependências e limites

Estados mínimos, taxas, numeração pública, retenção de snapshots e contrato de autorização devem ser fechados na API. A UI não deve editar snapshots nem usar o `Cart` como histórico definitivo.
