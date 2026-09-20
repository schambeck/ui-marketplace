# PLAN-003 — Supply e aquisição no frontend

**PRD:** [`PRD-003`](../prd/PRD-003-supply-aquisicao.md)  
**Plano relacionado:** [`api-marketplace PLAN-003`](../../../api-marketplace/docs/plan/PLAN-003-supply-aquisicao.md)  
**Dependências:** decisão B2C/marketplace/híbrido, `Offer`, autorização e contrato de `SupplySource`.

## Estado atual e alvo

Não há feature Angular para fonte de supply, aprovação ou divergência. O alvo é uma área operacional protegida que permita consultar e administrar fontes sem expor custo ou dados de fornecedor ao catálogo público.

## Abordagem técnica

Criar modelos `SupplySource`, condições/capacidade e exceção; serviço HTTP tipado em `shared/service/supply-source.service.ts`; e feature `supply-source-screen` com listagem paginada, detalhe, formulário e histórico. Adicionar rota protegida, entrada no sidebar e guards/autorização compatíveis com as roles da API.

O formulário deve validar apenas presença/formato conhecidos. Associação a oferta, aprovação, suspensão e encerramento serão comandos explícitos; dados sensíveis serão renderizados somente em componentes autorizados.

## Sequência e validação

1. Fechar campos, roles, estados e endpoints com a API.
2. Criar modelos/serviço e testes de URL, paginação e erros.
3. Criar lista, detalhe e fluxo de aprovação/suspensão.
4. Integrar seleção de fonte aprovada em oferta/fulfillment quando o contrato estiver pronto.
5. Adicionar divergência e histórico somente leitura.
6. Validar `npm run build` e `npm run test-headless`.

Critérios: fonte não aprovada não selecionável; fonte aprovada associável; suspensão bloqueia novas associações; divergência rastreável; `403` não altera a tela. Testes devem cobrir estados, filtros, autorização e respostas vazias/erro.

## Riscos e limites

Não implementar onboarding legal, payout, comissão ou settlement antes da decisão de negócio. Se o contrato atrasar, entregar modelos/mocks e manter a feature desabilitada por rota/role; rollback remove a feature sem tocar em catálogo público.

