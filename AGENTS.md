# AGENTS.md

Guia para agentes de IA que alteram o `ui-marketplace`. Este documento descreve o estado observado no repositório em 2026-09-19; quando uma recomendação estiver baseada em segurança ou manutenção, ela será indicada como tal.

## Visão geral

O projeto é uma interface Angular para um marketplace. A aplicação oferece catálogo e detalhe de produtos, autenticação, perfil e usuários, gestão de produtos, carrinho, checkout e pagamento Mercado Pago. A aplicação é uma SPA servida por Angular CLI em desenvolvimento e por Nginx em imagens Docker.

O `README.md` contém apenas o título e a identificação do projeto; as regras operacionais abaixo foram verificadas no código, no `package.json`, no `angular.json`, no `Makefile`, nos Dockerfiles e na árvore `src`.

## Stack e versões observadas

- Angular 17.2.x, Angular CLI/build 17.2.x e TypeScript 5.3.x.
- RxJS 7.8.x, Zone.js 0.14.x, PrimeNG 17.9.x, PrimeFlex 3.2.x e PrimeIcons 6.x.
- Keycloak Angular 15.1.x, Keycloak JS 25.x e SDK JS do Mercado Pago 0.0.3.
- Testes com Jasmine 4.6, Karma 6.4, Chrome launcher 3.2 e cobertura Karma 2.2.
- `package-lock.json` usa lockfile v3.
- O workflow do GitHub Actions testa com Node 18.x; os Dockerfiles de build usam Node 20 Alpine. A versão local não é fixada por `package.json`; preserve uma versão compatível com Angular 17 e valide com o CI.
- O front usa componentes PrimeNG e módulos Angular tradicionais (`NgModule`); não converter para standalone sem uma mudança arquitetural explícita.

## Estrutura do repositório

- `src/app/app.module.ts`: módulo raiz, módulos de feature, Keycloak, interceptador HTTP de erros e serviços globais.
- `src/app/app-routing.module.ts`: rotas da SPA e aplicação do `AuthGuard`.
- `src/app/feature/<feature>-screen/`: módulos de tela e componentes de UI. Exemplos: `catalog-screen`, `product-screen`, `user-screen`, `shopping-cart-screen`, `checkout-screen` e `payment-screen`.
- `src/app/feature/custom-autocomplete-component/`: autocompletes de usuário e produto.
- `src/app/shared/model/`: interfaces de entidades, requests, responses e paginação.
- `src/app/shared/service/`: serviços injetáveis, autenticação, autorização, acesso à API, armazenamento de imagens e interceptors.
- `src/app/shared/util/`: utilitários compartilhados, atualmente `HttpUtil`.
- `src/environments/`: ambiente base e variantes `development`, `production` e `tailscale`.
- `src/configurations/<ambiente>/config.json`: configurações copiadas para `assets` pelos builds de desenvolvimento, produção e Tailscale.
- `src/assets/`: assets estáticos, incluindo o arquivo de redirecionamento silencioso do Keycloak.
- `schema/ui-schema-marketplace.json` e `generate-ui-components.sh`: entrada e script para geração de entidades, serviços, módulos, listas, edições e autocompletes.
- `Dockerfile*`, `nginx*.conf`: empacotamento e serving por Nginx.
- `server.js` e `server-https.js`: servidores Express auxiliares presentes no repositório; não são usados pelos scripts do `package.json` nem pelo `Makefile`.

## Arquitetura Angular existente

Cada feature é um `NgModule` que declara seus componentes, importa `CommonModule`, módulos PrimeNG e `FormsModule`/`ReactiveFormsModule` quando necessário, e normalmente exporta os componentes da tela. O `AppModule` importa todos os módulos de feature.

Componentes usam `templateUrl` e `styleUrls`, com CSS local ao componente. Listas seguem um padrão recorrente de paginação, busca com `Subject`, `debounceTime(500)`, `distinctUntilChanged`, estados como `loading`/`saving`/`removing` e mensagens via `MessageService`. Componentes com subscriptions explícitas implementam `OnDestroy` e cancelam as subscriptions.

Serviços são `@Injectable({ providedIn: 'root' })`, usam `HttpClient`, constroem a URL a partir de `environment.baseUrl` e retornam `Observable<T>`. Serviços CRUD usam `Page<T>` e interfaces específicas. IDs em URLs são protegidos com `encodeURIComponent`; preserve isso.

Modelos são interfaces TypeScript em `shared/model`, com sufixos observados `.entity.ts`, `.request.ts` e `.response.ts`. Não coloque lógica de negócio ou chamadas HTTP em modelos.

Rotas observadas: `home`, `profile`, `user`, `user/:id`, `view-logged-user`, `list-product`, `edit-product`, `edit-product/:id`, `catalog`, `catalog/:id`, `shopping-cart`, `shopping-cart/:id`, `checkout/:id`, `payment`, além do redirect vazio para `catalog` e fallback `**` para página não encontrada. Rotas protegidas usam `AuthGuard`, baseado em `KeycloakAuthGuard`; preserve o redirecionamento de login.

O `ErrorHttpInterceptorService` registra a URL, converte erros HTTP em toast PrimeNG e relança o erro. O `NgrokHttpInterceptorService` existe, mas está desativado no `AppModule`; não o habilite globalmente sem avaliar o efeito sobre todas as requisições.

## Convenções de código

Fatos observados:

- Nomes de arquivos e pastas são kebab-case; classes são PascalCase; propriedades e métodos são camelCase.
- Componentes usam prefixo `app` nos selectors.
- TypeScript usa modo estrito, `strictTemplates`, `strictInjectionParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch` e `noImplicitOverride`.
- O `.editorconfig` define dois espaços, newline final, remoção de espaços à direita e aspas simples em `.ts`.
- A aplicação usa tanto `private` quanto `protected override`, subscriptions explícitas e tipos `Observable`, `Subject` e `BehaviorSubject`.
- Templates usam bindings Angular e componentes PrimeNG; estilos ficam nos arquivos `.css` ao lado do componente. Estilos globais ficam em `src/styles.css`.

Recomendações para novas alterações: mantenha esses padrões, prefira tipos explícitos para contratos da API, evite `any` novo, não introduza formatação ou aliases de importação incompatíveis com os arquivos próximos e mantenha o escopo de cada módulo de feature. Se uma inconsistência existente for encontrada, não faça uma limpeza ampla como parte de uma correção isolada.

## Instalação e execução local

Com Node/npm compatíveis instalados:

```bash
npm install
npm start
```

`npm start` executa `ng serve --open` e o build padrão do Angular é `development`. Equivalentes existentes no `Makefile` são `make deps` e `make run` (`ng serve -o`). O script `watch` executa build de desenvolvimento em modo watch:

```bash
npm run watch
```

Os ambientes importam `auth_config.json`, `auth_config.production.json` ou `auth_config.tailscale.json`, conforme o build. Esses arquivos precisam existir e conter configuração válida para a instalação alvo; não copie seus valores para commits, logs ou documentação.

## Builds

Comandos existentes:

```bash
npm run build              # ng build, configuração padrão development
npm run build:prod         # configuração production
npm run build:tailscale    # configuração tailscale
```

As configurações substituem `src/environments/environment.ts`. Produção também substitui `auth_config.json` por `auth_config.production.json`; development e Tailscale copiam o `config.json` do ambiente para `dist/ui-marketplace/assets`. O output configurado é `dist/ui-marketplace`.

O build de produção aplica budgets de 500 KB/2 MB para o bundle inicial e 2 KB/4 KB para estilos de componente. Tailscale mantém source maps, chunks nomeados e otimização desativada, conforme `angular.json`.

## Testes

```bash
npm test                    # Karma interativo/watch
npm run test-headless       # Karma sem watch, ChromeHeadless
```

Os mesmos scripts podem ser chamados pelo CI; o workflow executa `npm ci`, `npm run build --if-present` e `npm run test-headless`. Os testes atualmente encontrados são de `AppComponent`, home, página não encontrada, sidebar e `ErrorHttpInterceptorService`. Ao adicionar comportamento, acrescente ou ajuste o teste da área afetada.

## Makefile

Alvos verificados:

- `make deps`: `npm install`.
- `make run`: `ng serve -o`.
- `make generate-ui-components`: executa `generate-ui-components.sh`, que lê `schema/ui-schema-marketplace.json` com `jq` e usa o schematic `@schambeck/ng-crud-generator`.
- `make build` e `make build-prod`: builds normal e de produção.
- `make docker-build`, `make docker-build-dev`, `make docker-build-tailscale`: builds Docker usando os respectivos Dockerfiles e a tag `ui-marketplace:latest`.
- `make docker-tag`, `make docker-push`, `make docker-pull`: tag, push e pull do repositório configurado no próprio Makefile; confirme o registry antes de executar.
- `make docker-run`: publica a imagem na porta local `4200` para a porta 80 do container.
- `make docker-run-tailscale`: publica a porta local `443` para a porta 443 do container.

O script de geração não é chamado durante builds normais. Execute-o somente quando a mudança realmente vier do schema e revise o diff gerado antes de aceitar qualquer arquivo.

## Docker e Nginx

`Dockerfile` é uma imagem Nginx que copia um build já existente de `dist/ui-marketplace`, arquivos de validação/certificado ZeroSSL e `nginx.conf` (HTTP na porta 80). Portanto, gere o build antes de `make docker-build`.

`Dockerfile.dev` e `Dockerfile.tailscale` são multi-stage: usam Node 20 Alpine, `npm ci` com `legacy-peer-deps`, compilam produção ou Tailscale e depois copiam o resultado para Nginx Alpine. Os arquivos Nginx dev e Tailscale habilitam HTTPS e referenciam certificados nos diretórios copiados pela imagem.

O Nginx usa `try_files ... /index.html` para suportar rotas da SPA. Não remova esse fallback ao alterar configurações.

## Áreas sensíveis

- Autenticação: `app.module.ts` inicializa Keycloak com a configuração do ambiente; `AuthGuard` protege rotas; `auth.service.ts` e `authorization.service.ts` encapsulam estado/autorização. Preserve o `check-sso`, o redirect e a exclusão de assets da adição de token.
- APIs: serviços em `shared/service` usam `environment.baseUrl`; mantenha contratos, nomes de recursos, paginação (`page`, `size`, `search`) e headers existentes. Não espalhe URLs hard-coded em componentes.
- Catálogo/produtos: `CatalogService` consulta `/catalog`; `ProductService` gerencia `/products`; imagens usam `ImageService` e `ObjectStorageService`. Preserve a distinção entre catálogo público e operações autenticadas.
- Carrinho: `ShoppingCartService` usa `/shopping-cart`, suporta criação normal e `createIfAbsent`, atualiza o contador via `count$`; `CartService` consulta `/carts` e o carrinho do usuário. Mudanças devem preservar atualização de quantidade, remoção e refresh do contador.
- Pagamento: checkout carrega token OAuth e SDK Mercado Pago; `PreferenceService` e `PaymentService` chamam endpoints `/mercado-pago/preferences` e `/mercado-pago/payments`. Não exponha credenciais, tokens ou dados de pagamento e não altere o fluxo sem testar integração e estados de erro.

## Segredos, certificados e configurações

Os arquivos `auth_config*.json`, diretórios `certbot*` e `zerossl` são referenciados por builds e Docker e contêm ou podem conter configuração de autenticação e material de certificado. Não revele seus conteúdos, não cole valores em issues/PRs e não introduza novos segredos no código, templates ou logs. Antes de modificar deploy, confirme quais arquivos e certificados a imagem alvo espera. Recomenda-se migrar material privado para armazenamento/secret management apropriado, mas essa migração não faz parte de uma alteração comum de UI.

## Investigação e escopo

1. Reproduza o problema com o comando existente mais específico (`npm run build`, `npm run test-headless` ou o alvo Docker relacionado).
2. Inspecione primeiro o componente, módulo, serviço, rota e ambiente envolvidos; compare com uma feature próxima.
3. Verifique console, erro HTTP, URL efetiva, configuração de ambiente e contrato do modelo antes de mudar código.
4. Faça a menor alteração possível e não reformate, regenere ou atualize arquivos não relacionados.
5. Se um gerador for usado, revise todo o diff gerado; não aceite mudanças incidentais.

## Compatibilidade com Angular 17

Preserve `NgModule`, APIs e builders compatíveis com Angular 17.2.x, TypeScript 5.3.x, RxJS 7.8.x, PrimeNG 17 e Keycloak Angular 15.1.x. Não atualize Angular, TypeScript, PrimeNG, Keycloak ou o lockfile apenas para resolver uma alteração funcional sem justificar e validar a migração. Evite APIs introduzidas em versões posteriores e respeite o strict mode já configurado.

## Checklist antes de concluir

- [ ] A alteração ficou restrita ao escopo solicitado e não contém segredos, tokens, chaves ou certificados expostos.
- [ ] Rotas, guard, interceptor, ambiente e contrato de API foram revisados quando aplicável.
- [ ] O build apropriado passou: `npm run build`, `npm run build:prod` ou `npm run build:tailscale`.
- [ ] Os testes relevantes passaram; para uma verificação completa, `npm run test-headless`.
- [ ] Templates e estilos foram revisados, sem violar strict templates ou budgets relevantes.
- [ ] Se Docker foi afetado, o Dockerfile/Nginx/certificados exigidos pela imagem foram conferidos e o build correspondente foi executado.
- [ ] `git diff` e `git status` mostram somente os arquivos pretendidos.
- [ ] Nenhum arquivo não relacionado foi alterado durante diagnóstico ou geração.
