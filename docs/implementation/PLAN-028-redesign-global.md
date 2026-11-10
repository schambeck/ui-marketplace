# PLAN-028 — Redesign global implementado

Data: 10/11/2026.

## Diagnóstico

Angular 17.2, PrimeNG 17, PrimeFlex e módulos Angular tradicionais. A interface repetia estilos de painéis/cards, sombras e tabelas, misturava idiomas e não tinha tokens suficientes. O menu mostrava o grupo administrativo para todos os perfis. O catálogo expunha estados técnicos e a quantidade de produtos era formatada como moeda. Não há infraestrutura formal de internacionalização nem script de lint no projeto.

## Decisões de design

Base neutra, azul como ação principal, tipografia do sistema, bordas discretas, espaçamento e dimensões de controles compartilhados. PrimeNG e NgModule preservados, sem dependências adicionais. Os estilos de componentes PrimeNG estão limitados à área de conteúdo, com tratamento específico do cabeçalho e da navegação. As folhas globais da aplicação são carregadas após o tema para que os tokens sejam aplicados de forma previsível.

Storefront usa cards de produto e uma página de detalhes com galeria, preço e ação de compra. Backoffice usa tabelas densas, cabeçalhos explicativos e estados de publicação separados da disponibilidade. A moeda USD existente foi preservada; apresentação de números e datas usa pt-BR.

## Componentes compartilhados

- `src/styles.css`: tokens semânticos, superfícies, tabelas, formulários, foco, botões e estados responsivos.
- `src/app/shared/ui/ui.module.ts`: `PageHeaderComponent`, `UiStateComponent` e `StatusLabelPipe`.
- Application shell: cabeçalho compacto, navegação recolhível no desktop e drawer no mobile, link para pular ao conteúdo e indicador de navegação.
- Sidebar: grupos de compra, conta, vendas e administração; visibilidade derivada dos papéis Keycloak, sem mudança nos guards ou na autorização.

## Telas atualizadas

- Início: apresentação e atalhos para catálogo, pedidos, carrinho e solicitação de venda.
- Usuários e produtos: cabeçalhos, busca, tabelas, ações acessíveis, confirmação antes de excluir, estado vazio e erro. Quantidade como número, preços alinhados.
- Solicitações de vendedores: carregamento, erro com nova tentativa, ausência de solicitações e ações de decisão com bloqueio durante envio.
- Contextos de jogo e ofertas: tabelas, formulários responsivos, traduções visuais de status, histórico e filtros.
- Estoque: formulário de consulta com label, estados inicial/carregando/erro e tabelas vazias explicadas; operações existentes mantidas.
- Pedidos: cabeçalho, status traduzidos, totais alinhados e estado vazio; detalhes preservados.
- Quero vender: formulário em grid, campos obrigatórios, validação de e-mail, mensagens por campo, estado da solicitação e termos/versionamento existentes.
- Catálogo: grid adaptativo, imagens proporcionais, vendedor e avaliação quando disponíveis, preço e disponibilidade em destaque, ação de compra acessível e busca vazia.
- Detalhes: galeria com imagem principal como alternativa, informações opcionais condicionais, descrição e botão de compra junto ao preço.
- Carrinho: itens e resumo em duas colunas, quantidade, preço unitário, subtotal, total e feedback de remoção/atualização; empilhamento em telas menores.
- Perfil, edição de produtos/usuários, checkout e pagamento receberam a base visual e ajustes de idioma/formulários.

## Correções necessárias aos estados de interface

O catálogo usava `forkJoin([])` para páginas sem ofertas, completando sem emitir a página. Agora retorna a página vazia real da API, permitindo renderizar o estado vazio; há teste de regressão. A consulta de estoque agora encerra loading também no erro. Busca/paginação preservam filtros nas listagens ajustadas, e o carrinho envia o tamanho de página selecionado. Endpoints, payloads, enums, cálculos e o fluxo de checkout não foram substituídos.

## Responsividade e acessibilidade

Grid de catálogo adaptativo; detalhes e carrinho empilhados; formulários em uma coluna no mobile; tabelas com rolagem contida para preservar colunas. Controles com altura mínima de 44px, foco visível, labels, nomes acessíveis para botões de ícone, ações de navegação por teclado, estados com texto além de cor e respeito a movimento reduzido. Documento identificado como pt-BR; tradução dos controles PrimeNG centralizada na inicialização.

## Validação executada

- `npm run build`: aprovado.
- `npm run build:prod`: aprovado; bundle inicial de aproximadamente 1,74 MB, abaixo do limite de erro de 2 MB. Mantém aviso de orçamento de 500 KB e avisos CommonJS de Keycloak/Mercado Pago. Budgets não foram ampliados.
- `npm run test-headless`: 27 testes aprovados no ChromeHeadless, incluindo visibilidade por papel e emissão da página vazia do catálogo. Karma executado fora do sandbox para abrir sua porta local.
- `git diff --check`: aprovado.
- Navegador real com API local: inspeção visual de catálogo, detalhes e início em desktop (1440px) e mobile (320px); busca sem resultados, navegação pelo drawer e recolhimento do menu desktop. Medição DOM confirmou que o catálogo não ultrapassava a largura disponível em 320px e 1440px.
- Não existe script de lint no `package.json`.

## Limitações de validação

A sessão do navegador estava como visitante. Telas autenticadas, decisões administrativas, operações de estoque, carrinho autenticado e pagamento não foram validados ponta a ponta ou visualmente nessa sessão. A consulta de imagens adicionais retornou 401 para visitante; a página exibiu a imagem principal do produto. Não foram alteradas permissões da API para contornar isso.

A revisão não equivale a uma certificação WCAG nem a testes completos em todos os breakpoints. O PrimeNG 17 mantém texto interno `Page` em parte do nome acessível dos links numéricos do paginator. Nomes, categorias e demais conteúdo livre recebido da API não são traduzidos arbitrariamente. O texto integral dos termos não estava disponível; a interface preserva a aceitação e a versão existentes, sem inventar termos legais.

## Arquivos principais

`src/styles.css`, `src/app/shared/ui/ui.module.ts`, `src/app/app.component.*`, `src/app/app.module.ts`, `src/app/feature/header-screen/`, `src/app/feature/sidebar-screen/`, `src/app/feature/catalog-screen/`, `src/app/feature/shopping-cart-screen/`, `src/app/feature/seller-onboarding-screen/` e os templates das listagens administrativas.
