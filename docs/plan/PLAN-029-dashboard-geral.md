# Implementação de Dashboard Geral — Marketplace Platform

Atue como **Principal Frontend Engineer, Software Architect e Senior Product Designer**, especializado em Angular, dashboards analíticos, sistemas SaaS e plataformas de marketplace.

## 1. Objetivo

Implementar um Dashboard Geral para a aplicação Marketplace Platform, transformando a página inicial em um centro de inteligência operacional e acompanhamento do negócio.

O dashboard deverá apresentar uma visão consolidada da plataforma, incluindo:

- Usuários
- Vendedores
- Solicitações de vendedores
- Produtos
- Ofertas
- Estoque e disponibilidade
- Pedidos
- Vendas e faturamento
- Indicadores de desempenho
- Alertas operacionais
- Atividades recentes

**Implemente a funcionalidade no código existente. Não entregue apenas uma proposta ou documentação.**

O resultado deve possuir qualidade visual e técnica compatível com aplicações SaaS profissionais.

---

## 2. Investigação obrigatória

Antes de implementar:

1. Identifique a arquitetura atual do frontend Angular.
2. Analise as rotas, componentes, serviços e modelos.
3. Investigue a implementação atual de `/home`.
4. Identifique os endpoints disponíveis no backend.
5. Analise os DTOs e contratos existentes.
6. Identifique os mecanismos de autenticação e autorização.
7. Verifique a existência de paginação, filtros e consultas agregadas.
8. Identifique o Design System e as bibliotecas visuais existentes.
9. Investigue se já existem componentes de gráficos ou indicadores reutilizáveis.

Mapeie quais informações podem ser obtidas diretamente das APIs existentes.

**Não presuma a existência de endpoints, métricas ou propriedades.**

Classifique cada indicador como:

- Disponível diretamente.
- Calculável com dados existentes.
- Dependente de novo endpoint.
- Indisponível no modelo atual.

Não calcule indicadores globais utilizando apenas uma página de resultados paginados.

Não implemente métricas incorretas apenas para preencher o dashboard.

---

## 3. Arquitetura do Dashboard

Transforme `/home` em uma página inicial inteligente.

A interface deve ser adaptada conforme as permissões do usuário autenticado.

### Perfil administrador

Apresentar visão consolidada da operação do marketplace.

### Perfil vendedor

Apresentar somente indicadores e informações dos recursos que o vendedor está autorizado a consultar.

### Perfil comprador

Apresentar informações relevantes para sua jornada, como pedidos recentes, status e atalhos para o catálogo.

Não misture dados administrativos com informações destinadas a compradores.

Não confie apenas na ocultação visual de componentes para proteger informações.

Preserve as regras de autorização existentes.

Se a aplicação não possuir diferenciação suficiente entre perfis, investigue a modelagem atual e implemente apenas as experiências suportadas, documentando as limitações.

---

## 4. Dashboard Administrativo

### 4.1 Indicadores principais

Criar uma área de KPI Cards no topo da página.

Indicadores desejados:

**Usuários**
- Total de usuários cadastrados.
- Novos usuários no período, se disponível.

**Vendedores**
- Total de vendedores aprovados.
- Solicitações pendentes de aprovação.

**Produtos**
- Total de produtos.
- Produtos disponíveis.
- Produtos indisponíveis.

**Ofertas**
- Total de ofertas.
- Ofertas publicadas.
- Ofertas pausadas.
- Ofertas indisponíveis.

**Pedidos**
- Total de pedidos.
- Pedidos criados.
- Pedidos concluídos.
- Pedidos cancelados, conforme os estados reais do domínio.

**Financeiro**
- Valor total de pedidos elegíveis.
- Valor médio dos pedidos elegíveis.
- Evolução das vendas, quando houver dados suficientes.

Respeite rigorosamente a semântica financeira do backend.

Não confunda:
- Pedido criado com venda concluída.
- Valor de pedidos com receita efetivamente recebida.
- Oferta publicada com produto disponível.
- Quantidade de produtos com quantidade disponível em estoque.

Não apresente faturamento, receita ou conversão se os dados não permitirem calculá-los corretamente.

### 4.2 Apresentação dos KPIs

Cada card deverá possuir:

- Ícone representativo.
- Título objetivo.
- Valor principal destacado.
- Informação complementar, quando disponível.
- Variação percentual, somente quando calculável.
- Estado de carregamento.
- Estado de erro.
- Formatação adequada.

Utilize cores com significado semântico, evitando excesso de elementos decorativos.

---

## 5. Gráficos e análises

Crie uma seção de visualização analítica.

### 5.1 Evolução dos pedidos

Gráfico de linhas ou barras mostrando pedidos ao longo do tempo.

Permitir seleção de período:

- Últimos 7 dias.
- Últimos 30 dias.
- Últimos 90 dias.

Utilize datas reais fornecidas pelo backend.

### 5.2 Distribuição dos pedidos

Gráfico de barras ou donut mostrando a distribuição por status.

Utilize os estados reais do domínio.

### 5.3 Situação das ofertas

Gráfico mostrando:

- Publicadas.
- Pausadas.
- Outros estados existentes.

Diferencie status de publicação e disponibilidade.

### 5.4 Disponibilidade dos produtos

Apresentar a distribuição de produtos disponíveis e indisponíveis, conforme a semântica real dos dados.

### 5.5 Evolução financeira

Quando houver suporte adequado, apresentar a evolução do valor de pedidos elegíveis ou da receita confirmada.

O título do gráfico deve refletir exatamente o indicador calculado.

### Regras para gráficos

- Utilize uma biblioteca já instalada, se adequada.
- Caso necessário, selecione uma biblioteca compatível com a versão atual do Angular.
- Evite dependências excessivas.
- Adicione tooltips.
- Utilize legendas claras.
- Formate datas e valores corretamente.
- Adote escalas coerentes.
- Trate períodos sem registros.
- Não gere séries temporais fictícias.
- Não represente dados parciais como totais globais.

Se não houver dados suficientes, apresente um estado informativo em vez de um gráfico artificial.

---

## 6. Inteligência operacional

Criar uma seção chamada **Atenção necessária**.

Seu objetivo é destacar situações que exigem intervenção administrativa.

Exemplos:

- Solicitações de vendedores aguardando análise.
- Ofertas pausadas.
- Ofertas indisponíveis.
- Produtos sem estoque.
- Pedidos que necessitem de acompanhamento, conforme os estados existentes.

Cada alerta deverá apresentar:

- Identificação clara.
- Quantidade, quando disponível.
- Severidade apropriada.
- Ação contextual.
- Navegação para a funcionalidade correspondente.

Não invente regras de criticidade.

Não classifique automaticamente uma oferta pausada como erro: ela pode representar uma decisão legítima do vendedor.

Priorize alertas realmente acionáveis.

---

## 7. Atividades recentes

Criar uma seção de atividades recentes, conforme os dados disponíveis.

Possíveis informações:

- Últimos pedidos.
- Produtos recentemente cadastrados.
- Ofertas atualizadas.
- Solicitações de vendedores recebidas.

Apresente:

- Identificação.
- Tipo de atividade.
- Data/hora.
- Status.
- Link para detalhes, quando disponível.

Não simule um log de auditoria se a aplicação não possuir eventos ou histórico suficiente.

Utilize os registros reais disponíveis e descreva corretamente o significado da seção.

---

## 8. Ações rápidas

Adicionar uma área de acesso rápido às operações mais importantes.

Exemplos:

- Gerenciar usuários.
- Analisar vendedores.
- Gerenciar produtos.
- Consultar ofertas.
- Consultar inventário.
- Visualizar pedidos.
- Abrir catálogo.

Exiba somente ações permitidas ao usuário.

Os atalhos devem utilizar as rotas existentes.

---

## 9. Design e experiência visual

Adote uma estética moderna, inspirada em dashboards profissionais como Stripe Dashboard, Linear, Shopify Admin e Vercel.

### Estrutura sugerida

**Header do dashboard**
- Título: Visão geral
- Descrição contextual
- Seletor de período, quando aplicável
- Botão de atualização

**Primeira seção**
- Cards com os principais indicadores.

**Segunda seção**
- Gráfico principal de evolução.
- Gráfico secundário de distribuição.

**Terceira seção**
- Indicadores operacionais.
- Alertas que exigem atenção.

**Quarta seção**
- Atividades recentes.
- Ações rápidas.

### Requisitos visuais

- Hierarquia tipográfica clara.
- Espaçamento consistente.
- Cards discretos.
- Bordas suaves.
- Sombras mínimas.
- Ícones consistentes.
- Gráficos legíveis.
- Alinhamento preciso.
- Sem excesso de cores.
- Sem espaços vazios injustificados.
- Layout visualmente equilibrado.

Utilize os design tokens existentes ou consolide-os quando necessário.

Não introduza um segundo Design System independente.

---

## 10. Responsividade

Implementar layouts adaptativos.

### Desktop

- Grid de KPIs com múltiplas colunas.
- Gráficos lado a lado quando houver espaço.
- Distribuição equilibrada de informações.

### Tablet

- Redução do número de colunas.
- Gráficos adaptados.
- Navegação preservada.

### Mobile

- Cards empilhados ou organizados em duas colunas quando legíveis.
- Gráficos responsivos.
- Filtros acessíveis.
- Sem overflow horizontal.
- Áreas de toque adequadas.

Verifique especialmente larguras de 375px, 768px, 1024px e 1440px.

---

## 11. Integração de dados

Crie uma camada de apresentação organizada para o dashboard.

Exemplo conceitual:

- DashboardPage
- DashboardService
- DashboardSummary
- DashboardFilters
- KpiCard
- DashboardChart
- OperationalAlerts
- RecentActivity

Adapte os nomes à arquitetura real do projeto.

### Requisitos

- Componentes com responsabilidades claras.
- Tipagem forte.
- Sem uso indiscriminado de `any`.
- Sem duplicação de chamadas HTTP.
- Tratamento de erros.
- Estados de carregamento.
- Atualização controlada.
- Cancelamento de requisições obsoletas quando necessário.
- Respeito aos mecanismos atuais de autenticação.

Não faça múltiplas consultas desnecessárias para calcular uma única métrica.

Evite carregar grandes volumes de registros no navegador apenas para produzir agregações.

Quando uma métrica exigir processamento global, avalie a necessidade de um endpoint agregado no backend.

**Escopo de implementação:** frontend e integração com contratos existentes. Se forem necessários novos endpoints, documente seus contratos e dependências; não altere o backend sem autorização.

---

## 12. Consistência temporal

Todos os indicadores que utilizam períodos devem possuir uma semântica temporal explícita.

Defina:

- Campo de data utilizado.
- Intervalo inicial e final.
- Timezone aplicável.
- Inclusividade ou exclusividade dos limites.
- Tratamento de registros sem data.
- Diferença entre período atual e anterior.

O filtro global de período deve afetar somente os indicadores temporalmente compatíveis.

Métricas de estoque atual e totais cadastrais não devem ser filtradas por data sem uma definição de negócio apropriada.

---

## 13. Estados da interface

Implemente estados consistentes:

**Loading**
- Skeletons para indicadores.
- Loading apropriado para gráficos.

**Empty**
- Mensagem explicativa.
- Sem números fictícios.

**Error**
- Mensagem compreensível.
- Possibilidade de tentar novamente.

**Success**
- Dados apresentados corretamente.

**Partial failure**
- Uma falha em determinado indicador não deve necessariamente inutilizar todo o dashboard.

Diferencie explicitamente:

- Valor zero.
- Dado indisponível.
- Erro de carregamento.
- Métrica não suportada.

---

## 14. Testes

Implemente ou adapte testes para:

- Renderização dos indicadores.
- Formatação monetária.
- Formatação de datas.
- Cálculo de percentuais.
- Distribuição por status.
- Filtros temporais.
- Estados vazios.
- Erros de API.
- Permissões.
- Navegação.
- Responsividade, quando houver infraestrutura adequada.

Não altere testes apenas para esconder falhas.

Execute build, lint e testes disponíveis.

---

## 15. Estratégia de implementação

Trabalhe incrementalmente.

**Fase 1 — Discovery**
- Investigue o projeto.
- Mapeie os dados disponíveis.
- Identifique limitações.
- Defina os indicadores implementáveis.

**Fase 2 — Arquitetura**
- Defina os componentes.
- Estruture os modelos.
- Organize a integração de dados.

**Fase 3 — Layout**
- Implemente a estrutura visual.
- Crie os KPI Cards.
- Adicione seções e componentes compartilhados.

**Fase 4 — Integração**
- Conecte os indicadores às APIs reais.
- Implemente gráficos suportados.
- Adicione alertas e atividades.

**Fase 5 — Refinamento**
- Responsividade.
- Acessibilidade.
- Loading e Empty States.
- Consistência visual.

**Fase 6 — Validação**
- Build.
- Testes.
- Verificação de regressões.
- Revisão final.

---

## 16. Critérios de aceitação

A implementação será considerada concluída quando:

1. `/home` apresentar um dashboard funcional.
2. Os indicadores utilizarem dados reais.
3. Não existirem métricas fictícias.
4. Os gráficos representarem corretamente os dados.
5. As informações respeitarem as permissões do usuário.
6. O layout estiver integrado ao Design System.
7. O dashboard funcionar em desktop e mobile.
8. Os estados de carregamento, vazio e erro estiverem tratados.
9. As funcionalidades existentes continuarem operacionais.
10. O projeto compilar sem erros.

## 17. Entrega final

Apresente:

- Resumo da implementação.
- Indicadores disponíveis.
- Indicadores não implementados e respectivos motivos.
- APIs utilizadas.
- Componentes criados.
- Arquivos alterados.
- Testes executados.
- Pendências técnicas.
- Possíveis evoluções futuras.

**Diretriz final:** priorize informações confiáveis, clareza operacional e valor para tomada de decisão. Um dashboard com seis indicadores corretos é superior a um dashboard com vinte indicadores visualmente impressionantes, mas semanticamente incorretos.

Comece investigando o código e implemente a melhor versão possível com a infraestrutura e os dados realmente disponíveis.