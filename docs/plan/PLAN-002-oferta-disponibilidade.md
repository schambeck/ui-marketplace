# PLAN-002 — Oferta e disponibilidade no frontend

**PRD:** [`PRD-002`](../prd/PRD-002-oferta-disponibilidade.md)  
**Plano relacionado:** [`api-marketplace PLAN-002`](../../../api-marketplace/docs/plan/PLAN-002-oferta-disponibilidade.md)  
**Dependências:** `PLAN-001`, contrato público de `Offer` e carrinho compatível com `offerId`.

## Estado atual e alvo

O frontend já possui `Offer`, `CatalogService` e referência de contexto, mas catálogo, detalhe, carrinho e checkout ainda precisam tratar oferta como identidade vendável de ponta a ponta. O alvo é exibir apenas a decisão de disponibilidade retornada pela API e separar produto, oferta e histórico de compra.

## Abordagem técnica

- consolidar `Offer`, status, disponibilidade, preço, método de entrega e produto hidratado em modelos tipados;
- revisar `CatalogService`, `ProductService`, detalhe, carrinho e checkout para usar `offerId`;
- criar apresentação administrativa de ofertas somente se o contrato fornecer endpoints e permissões;
- derivar ações de `PUBLISHED` + `AVAILABLE`, sem substituir a validação do backend;
- tratar `409`, `400` e indisponibilidade preservando o estado editável.

Áreas previstas: `shared/model`, `shared/service/catalog.service.ts`, `shopping-cart.service.ts`, `catalog-screen`, `shopping-cart-screen`, `checkout-screen`, `app-routing.module.ts` e specs correspondentes. Não alterar o gerador sem decisão explícita.

## Contrato e sequência

1. Confirmar payload de `Offer`, identidade de carrinho, transições, erro e endpoints administrativos.
2. Cobrir serviço/modelos com testes de paginação, IDs codificados e estados.
3. Integrar catálogo/detalhe e bloquear oferta não vendável.
4. Migrar inclusão, atualização e checkout para `offerId`, mantendo compatibilidade documentada.
5. Adicionar telas administrativas caso estejam no contrato.
6. Executar regressão de imagens, produto, carrinho e pagamento.

## Validação e rastreabilidade

| Critério | Evidência |
|---|---|
| Oferta publicada visível | spec de catálogo/detalhe com payload controlado |
| Oferta indisponível bloqueada | spec de ações e carrinho |
| Pausa/retirada sem apagar histórico | teste de estados e detalhe histórico |
| Conflito sem substituição silenciosa | spec de `409`/erro de domínio |
| Compatibilidade | `npm run build` e `npm run test-headless` |

## Riscos, rollback e limites

O risco principal é manter `Product` como identidade em algum fluxo. A mitigação é localizar todos os consumidores antes da alteração e aceitar `productId` somente como compatibilidade explícita. Rollback: reverter serviços, modelos e componentes da oferta sem alterar migrations ou dados do backend.

