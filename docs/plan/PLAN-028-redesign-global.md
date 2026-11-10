Analisando as 12 telas do seu marketplace Angular, o principal problema não é a escolha das cores, mas a falta de um sistema visual consistente e de uma hierarquia clara entre as informações.

O aplicativo já possui uma estrutura funcional, mas ainda apresenta características de um painel administrativo genérico: muito espaço vazio, tabelas pouco refinadas, componentes com estilos diferentes, mistura de português e inglês e pouca diferenciação entre a experiência do comprador e a do administrador.

Minha proposta é orientar o Codex a realizar um redesign completo e incremental, preservando as funcionalidades, os contratos de API e as regras de negócio existentes.

### Prompt para o Codex

# Redesign Global — Marketplace Angular

Atue como **Principal Frontend Engineer, Senior UI/UX Designer e Design System Architect**, especializado em Angular e aplicações SaaS, marketplaces e painéis administrativos modernos.

## Objetivo

Realizar uma modernização visual completa da aplicação frontend, transformando a interface atual em um produto profissional, consistente, responsivo, acessível e visualmente sofisticado.

O objetivo não é apenas melhorar CSS. É elevar a qualidade da experiência do usuário, da organização visual e da arquitetura dos componentes.

**Implemente efetivamente as melhorias no código existente. Não entregue apenas sugestões ou um relatório.**

## 1. Investigação inicial obrigatória

Antes de alterar qualquer arquivo:

- Identifique a versão do Angular e as bibliotecas utilizadas.
- Investigue a estrutura de componentes, rotas, layouts e estilos.
- Identifique componentes compartilhados e oportunidades de reutilização.
- Analise os padrões atuais de formulários, tabelas, botões, cards e navegação.
- Verifique como são implementados loading, validação, notificações e tratamento de erros.
- Identifique a estratégia atual de responsividade.
- Localize os estilos globais e eventuais design tokens existentes.
- Preserve as bibliotecas atuais sempre que forem adequadas.
- Não introduza um novo framework visual sem justificativa técnica.

Use as telas existentes como referência funcional, mas não como limite para a qualidade do novo design.

## 2. Direção visual

Adote uma linguagem visual inspirada em aplicações SaaS e marketplaces modernos, com características de produtos como Linear, Stripe Dashboard, Shopify Admin e Vercel.

Essas referências devem orientar a qualidade, não resultar em cópias literais.

### Princípios

- Minimalismo funcional.
- Hierarquia visual forte.
- Tipografia moderna.
- Espaçamento consistente.
- Interfaces limpas, sem excesso de bordas.
- Uso intencional de cores.
- Componentes visualmente coesos.
- Feedback claro para ações e estados.
- Alta densidade informacional quando apropriada.
- Excelente legibilidade.
- Responsividade real.

Evite interfaces exageradamente coloridas, sombras pesadas, gradientes desnecessários e efeitos decorativos sem propósito.

A aplicação deve transmitir confiabilidade, maturidade técnica e qualidade de produto comercial.

## 3. Design System

Crie ou consolide um Design System reutilizável.

### Design tokens

Centralize:

- Cores semânticas.
- Tipografia.
- Escala de espaçamento.
- Border radius.
- Sombras.
- Bordas.
- Breakpoints.
- Estados interativos.
- Dimensões dos controles.

Utilize CSS Custom Properties ou a abordagem já adotada no projeto.

Evite valores arbitrários espalhados pelos componentes.

### Paleta sugerida

- Background principal: tons neutros claros.
- Surface: branco ou neutro suave.
- Primary: azul profissional.
- Success: verde.
- Warning: âmbar.
- Danger: vermelho.
- Text primary: cinza muito escuro.
- Text secondary: cinza intermediário.
- Border: cinza neutro discreto.

Garanta contraste adequado, inclusive nos badges e botões.

### Componentes compartilhados

Identifique oportunidades para padronizar:

- Page Header
- Page Container
- Card
- Button
- Input
- Select
- Search Field
- Data Table
- Pagination
- Status Badge
- Empty State
- Loading State
- Error State
- Confirmation Dialog
- Toast Notification
- Form Field
- Breadcrumb
- Section Header

Não crie abstrações desnecessárias. Extraia componentes compartilhados quando houver reutilização concreta ou benefício arquitetural claro.

## 4. Layout global

Redesenhe a estrutura principal da aplicação.

### Sidebar

A sidebar atual ocupa espaço considerável e possui uma apresentação visual genérica.

Melhore:

- Hierarquia entre grupos.
- Identificação visual da rota ativa.
- Espaçamento entre itens.
- Consistência dos ícones.
- Estados hover e focus.
- Possibilidade de recolhimento.
- Comportamento responsivo.
- Separação entre funcionalidades administrativas e funcionalidades de compra.

Evite manter menus administrativos visíveis para usuários sem as permissões correspondentes.

Não altere as regras de autorização existentes.

### Header

Modernize o cabeçalho:

- Melhor alinhamento dos elementos.
- Identidade visual consistente.
- Acesso ao perfil.
- Indicador do carrinho.
- Melhor comportamento em dispositivos móveis.
- Menos espaço vertical desperdiçado.

### Content Area

- Defina largura máxima apropriada.
- Padronize margens e espaçamentos.
- Elimine containers aninhados sem necessidade.
- Estabeleça uma hierarquia clara entre título, descrição, ações e conteúdo.
- Evite grandes áreas vazias sem intenção.

## 5. Redesign por funcionalidade

### 5.1 Home — `/home`

A página atual apresenta basicamente uma mensagem de boas-vindas.

Transforme-a em uma página inicial útil e visualmente atraente.

Considere:

- Saudação contextual.
- Acesso rápido ao catálogo.
- Acesso aos pedidos.
- Destaque para ações importantes.
- Cards de navegação.
- Conteúdo personalizado conforme permissões.

Não invente métricas ou dados que não estejam disponíveis nas APIs existentes.

### 5.2 Users — `/user`

Modernize a administração de usuários.

- Tabela mais limpa e legível.
- Cabeçalho de página consistente.
- Busca integrada.
- Ações contextualizadas.
- Identificação clara dos usuários.
- Tratamento de emails e nomes longos.
- Paginação padronizada.
- Confirmação visual para ações destrutivas.

Não altere o comportamento funcional existente sem necessidade.

### 5.3 Seller Applications — `/seller-applications`

A tela atual apresenta uma tabela vazia sem contexto.

Implemente um Empty State adequado, com:

- Ícone discreto.
- Mensagem informativa.
- Explicação sobre ausência de solicitações.
- Ação contextual, quando aplicável.

Melhore também a apresentação das solicitações e das decisões administrativas quando houver registros.

### 5.4 Products — `/list-product`

Modernize a gestão de produtos.

- Melhor organização das colunas.
- Alinhamento correto de valores monetários.
- Quantidades apresentadas como números, não como moeda.
- Formatação consistente de datas.
- Busca e ações bem posicionadas.
- Melhor apresentação das ações por linha.
- Estados de disponibilidade quando os dados permitirem.

A tabela deve continuar eficiente mesmo com muitos registros.

### 5.5 Game Context — `/game-context`

Modernize a listagem e os formulários de contextos.

- Apresente game, platform, region e variant com hierarquia clara.
- Use badges semânticos para status.
- Melhore a apresentação de valores ausentes.
- Padronize formulários e ações.
- Mantenha os dados técnicos necessários sem poluir a interface.

### 5.6 Offers — `/offer`

A tabela atual é funcional, mas visualmente densa e pouco expressiva.

Melhore:

- Organização das informações.
- Identificação dos produtos.
- Apresentação de preços.
- Disponibilidade.
- Status de publicação.
- Filtros.
- Busca.
- Paginação.
- Ações contextuais.

Diferencie visualmente os estados de publicação e disponibilidade.

Não confunda status comercial com disponibilidade de estoque.

### 5.7 Inventory — `/inventory`

A página atual possui apenas um campo de consulta e grande espaço vazio.

Transforme-a em uma interface operacional de consulta.

- Cabeçalho explicativo.
- Formulário compacto.
- Estados inicial, loading, sucesso, vazio e erro.
- Apresentação estruturada do resultado.
- Destaque para informações operacionais relevantes.

Preserve a consulta por identificador público do pedido e os contratos existentes.

Não invente operações de estoque ou endpoints.

### 5.8 Orders — `/orders`

Melhore a experiência de acompanhamento dos pedidos.

- Identificação visual clara.
- Status semânticos.
- Valores monetários alinhados.
- Datas quando disponíveis.
- Acesso intuitivo aos detalhes.
- Empty State adequado.
- Paginação consistente.

Preserve o fluxo de consulta dos pedidos.

### 5.9 Become Seller — `/become-seller`

O formulário atual é excessivamente simples e ocupa uma grande área vertical.

Modernize:

- Hierarquia de campos.
- Agrupamento lógico.
- Descrições auxiliares.
- Indicação de obrigatoriedade.
- Mensagens de validação.
- Estados de envio.
- Confirmação após submissão.
- Apresentação dos termos.

O formulário deve ser confortável em desktop e mobile.

### 5.10 Catalog — `/catalog`

Esta é uma das páginas mais importantes do produto.

Redesenhe os cards de produtos com atenção especial à experiência de compra.

Cada card deve apresentar claramente:

- Imagem.
- Nome.
- Preço.
- Vendedor, quando disponível.
- Avaliação, quando disponível.
- Disponibilidade.
- Ação principal.

Melhore:

- Proporções das imagens.
- Espaçamento.
- Alinhamento entre cards.
- Tipografia.
- Hierarquia do preço.
- Estados hover.
- Responsividade.
- Busca.
- Paginação.

Evite exibir informações técnicas como `LEGACY` e `PUBLISHED` de maneira que prejudiquem a experiência do comprador.

Informações técnicas devem permanecer acessíveis nos contextos administrativos apropriados.

### 5.11 Product Details — `/catalog/:id`

Redesenhe a página de detalhes do produto.

Adote uma estrutura de comércio eletrônico profissional:

- Área visual do produto.
- Informações principais.
- Preço em destaque.
- Disponibilidade.
- Avaliação.
- Descrição.
- Informações contextuais relevantes.
- Botão principal de adicionar ao carrinho.

Evite espaços vazios excessivos.

Não apresente campos vazios como se fossem informações válidas.

Preserve as regras de disponibilidade e os estados dos botões.

### 5.12 Shopping Cart — `/shopping-cart`

Modernize o carrinho.

- Layout claro.
- Imagem e nome dos produtos.
- Preço unitário.
- Controle de quantidade.
- Subtotal por item.
- Resumo financeiro.
- Total destacado.
- Checkout como ação principal.
- Remoção com feedback adequado.

Considere um layout em duas colunas no desktop e uma coluna no mobile.

Não altere a lógica de cálculo, reserva ou checkout existente.

## 6. Consistência de idioma

Atualmente a aplicação mistura português e inglês.

Investigue a estratégia de internacionalização existente.

Se não houver suporte formal a múltiplos idiomas, padronize os textos visíveis para português brasileiro, preservando os identificadores técnicos e contratos.

Não altere enums, propriedades JSON, endpoints ou nomes de campos do backend para realizar traduções visuais.

Centralize as traduções de status quando apropriado.

## 7. Responsividade

A aplicação deve funcionar corretamente em:

- Desktop: 1440px ou superior.
- Notebook: 1024px a 1439px.
- Tablet: 768px a 1023px.
- Mobile: 320px a 767px.

Requisitos:

- Nenhum overflow horizontal indevido.
- Sidebar adaptativa.
- Cards com grid responsivo.
- Formulários utilizáveis em telas pequenas.
- Tabelas com estratégia responsiva apropriada.
- Botões com áreas de interação adequadas.
- Tipografia legível.
- Espaçamentos proporcionais.

Não resolva problemas de responsividade simplesmente ocultando informações importantes.

## 8. Estados de interface

Padronize os estados:

- Initial
- Loading
- Empty
- Error
- Success
- Disabled
- Hover
- Focus

Evite páginas em branco durante carregamento ou quando não existirem registros.

Utilize skeleton loading onde fizer sentido, sem criar animações excessivas.

Garanta mensagens de erro compreensíveis e feedback para ações do usuário.

## 9. Acessibilidade

Adote boas práticas WCAG 2.2 AA aplicáveis.

Verifique:

- Contraste.
- Navegação por teclado.
- Focus visible.
- Labels de formulários.
- Mensagens de erro.
- Estados disabled.
- Semântica HTML.
- Identificação de botões por leitores de tela.
- Uso correto de ícones.
- Responsividade com zoom.

Não utilize cor como único indicador de estado.

## 10. Qualidade de implementação

Respeite a arquitetura atual do frontend.

- Utilize os padrões recomendados para a versão instalada do Angular.
- Preserve componentes e serviços funcionais.
- Evite duplicação de estilos.
- Prefira componentes reutilizáveis.
- Não introduza dependências desnecessárias.
- Não modifique contratos de API.
- Não altere regras de negócio.
- Não modifique o backend.
- Não introduza dados mockados em fluxos reais.
- Não remova funcionalidades existentes.
- Não altere autenticação ou autorização.
- Não faça refatorações sem relação com o redesign.

Evite CSS global que cause regressões em componentes não relacionados.

## 11. Estratégia de execução

Execute o trabalho em etapas.

**Etapa 1 — Auditoria visual e técnica**

Analise a implementação atual, identifique inconsistências e estabeleça prioridades.

**Etapa 2 — Design System**

Implemente os tokens e consolide os componentes compartilhados necessários.

**Etapa 3 — Application Shell**

Modernize sidebar, header, navegação e container principal.

**Etapa 4 — Telas administrativas**

Atualize Users, Seller Applications, Products, Game Context, Offers e Inventory.

**Etapa 5 — Experiência de compra**

Atualize Home, Catalog, Product Details, Shopping Cart, Orders e Become Seller.

**Etapa 6 — Refinamento**

Revise responsividade, estados de interface, acessibilidade e consistência visual.

**Etapa 7 — Validação**

Execute os comandos de build, lint e testes disponíveis no projeto.

Se houver infraestrutura de testes visuais ou navegador automatizado disponível, valide as páginas em desktop e mobile.

Não declare validação visual concluída se não tiver executado essa verificação.

## 12. Critérios de aceitação

O trabalho estará concluído quando:

- Todas as páginas apresentarem linguagem visual consistente.
- O layout global estiver modernizado.
- As tabelas seguirem um padrão visual.
- Os formulários estiverem padronizados.
- O catálogo tiver aparência profissional.
- O carrinho oferecer uma experiência de compra clara.
- Os estados vazios e de carregamento estiverem tratados.
- A aplicação funcionar em desktop e mobile.
- As funcionalidades existentes permanecerem operacionais.
- O frontend compilar sem erros.
- Não houver alterações nos contratos de backend.

## 13. Entrega final

Ao concluir, apresente:

1. Diagnóstico inicial resumido.
2. Principais decisões de design.
3. Componentes compartilhados criados ou modificados.
4. Telas atualizadas.
5. Melhorias de responsividade.
6. Resultados dos testes e build.
7. Limitações ou pendências.
8. Arquivos principais alterados.

**Importante:** não faça apenas mudanças cosméticas superficiais. O resultado deve representar uma evolução perceptível da experiência do usuário e da qualidade visual do produto, preservando a estabilidade funcional da aplicação.

Comece investigando o frontend existente e implemente o redesign de forma incremental.

### Prioridades que eu adotaria

| Prioridade | Área                          | Impacto esperado                      |
| ---------- | ----------------------------- | ------------------------------------- |
| P0         | Design System + layout global | Consistência em todas as páginas      |
| P0         | Catálogo + detalhes           | Qualidade da experiência de compra    |
| P1         | Tabelas administrativas       | Legibilidade e eficiência operacional |
| P1         | Carrinho + checkout visual    | Clareza do fluxo de compra            |
| P1         | Responsividade                | Usabilidade em dispositivos móveis    |
| P2         | Home + estados vazios         | Percepção de produto completo         |
| P2         | Microinterações               | Refinamento visual                    |

Uma decisão arquitetural importante: eu não transformaria cada página em um design independente. O Codex deve primeiro estabelecer os design tokens, os componentes reutilizáveis e o Application Shell. Assim, as melhorias se propagam de maneira consistente e reduzem o custo de manutenção.

Também recomendo manter uma distinção visual entre Storefront (comprador) e Backoffice (administração), compartilhando o mesmo Design System. Isso evita que o catálogo pareça um CRUD administrativo e que o painel administrativo tente imitar uma loja virtual.