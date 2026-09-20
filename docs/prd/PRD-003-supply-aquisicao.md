# PRD-003 — Supply e aquisição no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-003-supply-aquisicao.md` · Supply · Essencial  
**Dependência:** modelo operacional B2C, marketplace ou híbrido ainda precisa ser decidido.

## Problema e objetivo

Operadores não conseguem consultar de forma controlada a origem, capacidade e condição que sustentam uma oferta. A UI deve dar visibilidade operacional sem expor custos ou dados de supplier ao cliente final.

## Escopo

- telas protegidas para listar, consultar, aprovar, suspender e encerrar fontes;
- associação de uma fonte aprovada a uma oferta, quando permitido;
- exibição de capacidade, validade, restrições e divergências conforme papel;
- trilha de status, ator, motivo e histórico.

Não inclui onboarding legal, cálculo de comissão/settlement nem decisão do modelo comercial.

## Critérios de aceite

- Fonte `PENDING` não pode ser selecionada para publicação ou alocação.
- Fonte aprovada mostra contexto compatível, capacidade e validade sem revelar custo ao cliente.
- Suspensão impede novas associações e mantém o histórico consultável.
- Divergência de quantidade, qualidade ou custo abre um registro rastreável até a decisão.
- Operadores veem apenas ações autorizadas; `403` não é tratado como sucesso.
- Testes cobrem filtros, estados, autorização, associação e divergência.

## Dependências

Contrato de `SupplySource`, definição dos atores legais, roles, campos sensíveis e integração com oferta, inventory e fulfillment.
