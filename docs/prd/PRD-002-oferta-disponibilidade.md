# PRD-002 — Oferta e disponibilidade no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-002-oferta-disponibilidade.md` · Catálogo · Essencial  
**Dependência:** `PRD-001` e contrato público de `Offer`.

## Problema e objetivo

O frontend ainda trata produto, preço e disponibilidade como um único registro. A experiência deve apresentar a oferta realmente vendável, seu contexto, preço e método de entrega, sem permitir checkout de uma oferta pausada, retirada ou indisponível.

## Escopo

- representar `Offer` separadamente de `Product`;
- exibir preço, contexto, disponibilidade e método de entrega no catálogo e detalhe;
- selecionar uma oferta no carrinho e congelar o preço mostrado na inclusão;
- refletir estados `DRAFT`, `PUBLISHED`, `PAUSED` e `RETIRED` conforme autorização;
- tratar conflitos de disponibilidade e preço com mensagem acionável.

Ficam fora do escopo a regra de publicação, locking, persistência e criação da oferta, que pertencem à API.

## Requisitos funcionais

- **RF-002.1:** somente ofertas publicadas e disponíveis podem iniciar nova compra.
- **RF-002.2:** produto e oferta aparecem em áreas distintas; o preço pertence à oferta.
- **RF-002.3:** uma oferta pausada, retirada ou sem disponibilidade não pode ser adicionada ao carrinho.
- **RF-002.4:** o carrinho envia `offerId` e mantém `productId` apenas quando exigido por compatibilidade.
- **RF-002.5:** erro de revalidação no carrinho/checkout informa que a oferta mudou e permite atualizar a seleção.
- **RF-002.6:** usuários autorizados podem consultar e alterar ofertas conforme o contrato, com motivo e status visíveis.

## Critérios de aceite

- Oferta publicada aparece com contexto, preço e disponibilidade corretos.
- Oferta indisponível não habilita adicionar ao carrinho nem iniciar checkout.
- Pausar/retirar uma oferta preserva referências históricas e remove ações de nova compra.
- O carrinho não substitui silenciosamente uma oferta por outra.
- Conflito `409` ou indisponibilidade preserva os itens não afetados e explica a ação necessária.
- Testes cobrem catálogo, detalhe, carrinho, checkout e estados de oferta.

## Dependências e decisões abertas

Contrato de `Offer`, múltiplas ofertas por produto, formato da disponibilidade, permissões administrativas e política de atualização de preço. A UI não deve duplicar regras de publicação nem usar `Product.inventoryStatus` como fonte de verdade.

