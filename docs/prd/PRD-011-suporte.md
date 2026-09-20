# PRD-011 — Suporte e casos no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-011-suporte.md` · Support · Importante  
**Dependência:** autorização, pedido, fulfillment, refund e disputa.

## Problema e objetivo

Dúvidas e falhas não têm ticket, responsável ou prazo visível. A UI deve permitir atendimento rastreável para cliente e operador, com separação de conteúdo sensível.

## Escopo

- criar caso com categoria, prioridade, pedido opcional e canal;
- listar e consultar casos próprios ou da fila autorizada;
- mensagens, anexos permitidos, atribuição, SLA e histórico;
- estados `OPEN`, `CLASSIFIED`, `ASSIGNED`, `WAITING`, `IN_PROGRESS`, `RESOLVED`, `CLOSED` e reabertura.

## Critérios de aceite

- Solicitação vira caso com identificador e estado inicial visíveis.
- Cliente e operador veem somente conteúdo permitido ao papel/contexto.
- Responsável, prioridade e prazo ficam claros na fila operacional.
- Resolução registra causa, ação e vínculos sem apagar mensagens anteriores.
- Caso fechado pode ser reaberto apenas conforme regra da API.
- Testes cobrem criação, classificação, mensagens, SLA, autorização e reabertura.

## Dependências

Canais, horário, SLA, papéis, limites de anexos e eventual provedor externo. A UI não deve inferir acesso a partir de campos ocultos.

