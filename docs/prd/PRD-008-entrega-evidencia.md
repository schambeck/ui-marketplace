# PRD-008 — Instruções e evidência de entrega no frontend

**Rastreabilidade:** plano `api-marketplace/docs/plan/PLAN-008-entrega-evidencia.md` · Delivery · Essencial/importante  
**Dependência:** contexto, regras por game e fulfillment.

## Problema e objetivo

Cada contexto e método pode exigir instruções diferentes, mas o frontend não coleta nem apresenta uma prova estruturada da entrega. A UI deve orientar o cliente, proteger dados e preservar a evidência original.

## Escopo

- formulário dinâmico de instruções conforme contrato do contexto;
- validação antes do fulfillment e correção versionada pelo cliente;
- visão operacional minimizada das instruções;
- registro de tentativa, resultado, quantidade e evidência;
- confirmação ou contestação do cliente sem apagar a tentativa.

## Critérios de aceite

- Checkout bloqueia instrução obrigatória ausente ou inválida com orientação clara.
- Cliente consegue corrigir antes da execução e vê a versão aplicada.
- Operador recebe somente os campos necessários.
- Entrega total, parcial, falha e contestação aparecem como estados distintos.
- Upload/consulta de evidência usa acesso autorizado e não expõe URL pública permanente.
- Testes cobrem validação, versionamento, upload, escopo, confirmação e contestação.

## Dependências e limites

Campos, consentimento, retenção, checksum e métodos permitidos vêm do contrato da API. A UI não deve gravar conteúdo sensível em logs nem transformar uma URL de storage em prova por si só.

