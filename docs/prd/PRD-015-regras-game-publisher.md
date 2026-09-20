# PRD-015 — Regras por game e publisher no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-015-regras-game-publisher.md` · Rules · Importante  
**Dependência:** contexto, oferta, entrega e contrato versionado de `RuleSet`.

## Problema e objetivo

Regras de região, campos de conta, quantidade, método e janela variam por contexto. A UI deve orientar publicação, checkout e fulfillment com a regra aplicada, sem duplicar o motor de decisão.

## Escopo

- manutenção administrativa de rulesets e versões conforme autorização;
- exibição de campos e limites exigidos pelo contexto;
- mensagens de bloqueio ou revisão com motivo compreensível;
- consulta da versão aplicada a uma oferta, pedido ou job.

## Critérios de aceite

- Oferta incompatível não é apresentada como publicável quando a API bloquear.
- Checkout destaca campos obrigatórios, limites e janela aplicáveis.
- Regra ausente, expirada ou conflitante gera bloqueio/revisão, nunca validação silenciosa.
- Alteração de regra afeta novas vendas; pedido antigo continua mostrando seu snapshot.
- Operador consegue identificar a regra e versão que justificaram a decisão.
- Testes cobrem formulário dinâmico, incompatibilidade, expiração, conflito e histórico.

## Limites

Fonte oficial, precedência, aprovação e interpretação de termos são decisões de produto/backend. A UI pode validar formato e presença, mas a API permanece autoridade.

