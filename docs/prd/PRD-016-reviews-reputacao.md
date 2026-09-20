# PRD-016 — Reviews e reputação no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-016-reviews-reputacao.md` · Reputation · Evolutivo  
**Dependência:** pedido concluído, oferta correta, janela e moderação.

## Problema e objetivo

O rating atual não prova uma experiência real e não oferece moderação. Se aprovado para o MVP, o frontend deve permitir avaliações elegíveis, mostrar reputação derivada e preservar histórico.

## Escopo

- convite e formulário de review após pedido elegível;
- uma avaliação por transação/janela, com edição versionada;
- consulta pública de avaliações publicadas;
- moderação, denúncia, contestação e ocultação para papéis autorizados;
- exibição de rating derivado da fonte aprovada.

## Critérios de aceite

- Cliente inelegível não vê publicação habilitada e recebe explicação adequada.
- Review publicada aparece vinculada à oferta correta e ao estado permitido.
- Conteúdo oculto/rejeitado não aparece publicamente nem entra no rating.
- Edição e moderação preservam versões e auditoria.
- Recálculo repetido produz o mesmo rating e a UI não usa `Product.rating` como fonte concorrente.
- Testes cobrem elegibilidade, duplicidade, edição, moderação, denúncia e vazio.

## Decisões abertas

Entrada no MVP, objeto avaliável, janela, anonimização, critérios de moderação e uso operacional da reputação. A UI não deve transformar rating em regra de risco ou fulfillment sem contrato explícito.

