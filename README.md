# ui-marketplace
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/schambeck/ui-marketplace/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/schambeck/ui-marketplace/tree/main)

Interface web Angular para um marketplace, com catálogo público, autenticação, gerenciamento de usuários e produtos, carrinho de compras, checkout e pagamento via Mercado Pago.

## Visão do Negócio

Esta aplicação é a interface web do marketplace. Ela permite que visitantes e clientes autenticados descubram produtos, consultem suas informações e montem uma seleção de compra. A partir do carrinho, o cliente pode iniciar o checkout, concluir o pagamento no Mercado Pago e visualizar o retorno recebido da integração.

Além da experiência de compra, o frontend oferece operações autenticadas para manter produtos, imagens e usuários, bem como consultar a identidade e o perfil do usuário conectado. A confirmação comercial da venda, o processamento assíncrono do pagamento, estoque transacional, pedidos e entrega não são acompanhados por esta aplicação e continuam dependentes do backend e dos sistemas externos.

### Atores do Negócio

- **Visitante** — pesquisa o catálogo público e consulta os detalhes dos produtos.
- **Cliente autenticado** — adiciona produtos ao carrinho, ajusta sua seleção, inicia o checkout e consulta seus dados de identidade.
- **Usuário operacional ou administrativo** — mantém produtos, imagens e usuários conforme as permissões efetivas do backend. O frontend exige autenticação, mas não declara papéis específicos nas rotas.
- **Mercado Pago** — participa do checkout externo e devolve o resultado do pagamento para registro na aplicação.

### Capacidades Principais

- Descoberta e consulta de produtos, preços, disponibilidade aparente e imagens.
- Seleção de produtos no carrinho, alteração de quantidades, remoção de itens e consulta do total.
- Preparação do checkout e integração com a wallet do Mercado Pago.
- Registro e apresentação do retorno do pagamento.
- Manutenção de produtos, imagens e usuários para operações autenticadas.
- Consulta do perfil e da identidade do usuário conectado, além do início de fluxos OAuth quando aplicável.

### Jornadas Principais

- **Descobrir e selecionar um produto:** consultar o catálogo, pesquisar ou paginar, abrir os detalhes e adicionar o produto ao carrinho; visitantes são encaminhados ao login quando necessário.
- **Preparar uma compra:** revisar itens e total, alterar quantidades ou remover produtos e iniciar o checkout.
- **Pagar e registrar o retorno:** criar uma preferência, concluir o pagamento no Mercado Pago e retornar à aplicação para registrar e exibir o status recebido.
- **Gerir a oferta do marketplace:** listar, criar, editar ou remover produtos e associar imagens.
- **Administrar cadastros e identidade:** consultar ou manter usuários, visualizar o próprio perfil e iniciar uma autorização OAuth quando necessária.

### Sistemas Relacionados

O frontend depende do backend do marketplace para dados, regras e operações de negócio, do Keycloak para autenticação e do Mercado Pago para o checkout e o retorno do pagamento. O armazenamento de objetos é utilizado para as imagens dos produtos.

### Documentação de Negócio

Para processos de negócio, jornadas, regras, fluxos e lacunas detalhados, consulte [`docs/business/business-processes.md`](docs/business/business-processes.md).

## Funcionalidades

- Navegação pelo catálogo e visualização de detalhes de produtos.
- Autenticação e proteção de rotas com Keycloak.
- Consulta e gerenciamento de usuários e produtos.
- Perfil do usuário autenticado.
- Carrinho de compras com atualização de quantidades e contador de itens.
- Checkout e integração com preferências e pagamentos do Mercado Pago.
- Upload e consulta de imagens e integração com armazenamento de objetos.
- Interface baseada em PrimeNG, PrimeFlex e PrimeIcons.

## Stack

- Angular 17.2.x com módulos tradicionais (`NgModule`).
- TypeScript 5.3.x, RxJS 7.8.x e Zone.js 0.14.x.
- PrimeNG 17.9.x, PrimeFlex 3.2.x e PrimeIcons 6.x.
- Keycloak Angular 15.1.x e Keycloak JS 25.x.
- SDK JavaScript do Mercado Pago 0.0.3.
- Testes com Jasmine, Karma e ChromeHeadless.

## Pré-requisitos

- Node.js compatível com Angular 17. O workflow de CI utiliza Node.js 18.x; as imagens Docker de build utilizam Node.js 20 Alpine.
- npm.
- Google Chrome ou Chromium para executar os testes localmente com Karma/ChromeHeadless.
- Docker, caso a aplicação seja executada em contêiner.

## Configuração

As configurações de ambiente são selecionadas pelo Angular durante o build:

- `development`: `src/environments/environment.development.ts` e `src/configurations/development/config.json`.
- `production`: `src/environments/environment.production.ts` e `src/configurations/production/config.json`.
- `tailscale`: `src/environments/environment.tailscale.ts` e `src/configurations/tailscale/config.json`.

Os arquivos `auth_config.json`, `auth_config.production.json` e `auth_config.tailscale.json` devem existir no diretório raiz quando forem necessários pelo ambiente correspondente. Eles devem ser fornecidos com valores válidos para a instalação alvo e não devem conter credenciais privadas expostas no repositório.

As configurações definem, entre outros valores, a URL da API, os parâmetros de autenticação, o servidor Keycloak e as opções de integração com o Mercado Pago. O arquivo `silent-check-sso.html`, utilizado pela inicialização silenciosa do Keycloak, fica em `src/assets`.

## Instalação e desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

O comando executa `ng serve --open` e usa a configuração `development` por padrão. A aplicação é disponibilizada pelo Angular CLI na porta padrão do `ng serve`.

Para gerar o build de desenvolvimento em modo de observação:

```bash
npm run watch
```

Os mesmos fluxos podem ser executados pelos alvos equivalentes do `Makefile`:

```bash
make deps
make run
```

## Builds

```bash
# Build de desenvolvimento
npm run build

# Build de produção
npm run build:prod

# Build para Tailscale
npm run build:tailscale
```

Os artefatos são gerados em `dist/ui-marketplace`. O build de produção aplica limites de tamanho ao bundle inicial e aos estilos de componentes.

## Testes

Para executar os testes em modo interativo:

```bash
npm test
```

Para executar os testes uma única vez em ChromeHeadless:

```bash
npm run test-headless
```

O pipeline do GitHub Actions instala as dependências com `npm ci`, executa o build e roda `npm run test-headless` para alterações em `master` e pull requests direcionados a `master`.

## Geração de componentes

O script abaixo gera entidades, serviços, módulos de tela, listas, telas de edição e autocompletes a partir de `schema/ui-schema-marketplace.json`:

```bash
./generate-ui-components.sh
```

O script depende de `jq` e do schematic `@schambeck/ng-crud-generator` disponível para o Angular CLI. Revise todo o diff gerado antes de incorporar as alterações.

Também existe um alvo equivalente no `Makefile`:

```bash
make generate-ui-components
```

## Docker

O `Dockerfile` espera que o build já exista em `dist/ui-marketplace` e copia os arquivos para uma imagem Nginx:

```bash
npm run build
make docker-build
make docker-run
```

O contêiner publicado por `make docker-run` expõe a aplicação localmente na porta `4200`.

As imagens `Dockerfile.dev` e `Dockerfile.tailscale` fazem o build dentro de uma etapa Node.js e depois servem os arquivos com Nginx:

```bash
make docker-build-dev
make docker-run

make docker-build-tailscale
make docker-run-tailscale
```

Os fluxos HTTPS dependem dos arquivos de certificado esperados pelos respectivos Dockerfiles (`certbot` ou `certbot-tailscale`). O modo Tailscale publica a porta `443` por meio de `make docker-run-tailscale`. Não inclua certificados, chaves privadas ou outros segredos no repositório.

## Rotas principais

As rotas públicas incluem:

- `/catalog` e `/catalog/:id`: catálogo e detalhes do produto.
- `/home`: página inicial.
- `/payment`: pagamento.

As rotas protegidas pelo `AuthGuard` incluem:

- `/profile` e `/view-logged-user`.
- `/user` e `/user/:id`.
- `/list-product`, `/edit-product` e `/edit-product/:id`.
- `/shopping-cart` e `/shopping-cart/:id`.
- `/checkout/:id`.

A rota vazia redireciona para `/catalog` e rotas não encontradas exibem a página correspondente.

## Estrutura resumida

```text
src/
├── app/
│   ├── feature/       # módulos e componentes das telas
│   ├── shared/model/  # entidades, requests e responses
│   ├── shared/service/ # serviços HTTP, autenticação e integrações
│   └── shared/util/   # utilitários compartilhados
├── assets/            # arquivos estáticos e suporte ao Keycloak
├── configurations/    # configurações copiadas para assets por ambiente
└── environments/      # substituições de ambiente do Angular
```

O Nginx usa `try_files` com fallback para `index.html`, permitindo o funcionamento das rotas da SPA quando uma URL é acessada diretamente.

## Segurança e deploy

- Não versione tokens, credenciais, certificados, chaves privadas ou valores secretos de autenticação e pagamento.
- Confirme os arquivos de configuração e certificados necessários antes de criar uma imagem de deploy.
- As requisições para a API usam a URL definida pelo ambiente; não coloque URLs de API diretamente nos componentes.
- O interceptor global de erros transforma falhas HTTP em mensagens da interface. O interceptor específico de ngrok existe no projeto, mas permanece desativado por padrão.
- Antes de publicar uma imagem, confira o ambiente escolhido, os certificados montados e as regras do Nginx.
