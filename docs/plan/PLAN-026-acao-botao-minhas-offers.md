# PLAN-026 — Ação do botão “Ir para minhas offers”

**Status:** planejado  
**Escopo:** frontend Angular (`ui-marketplace`)

## Objetivo

Definir e garantir o comportamento do botão “Ir para minhas offers”, exibido na tela “Quero vender” para usuários que já possuem acesso de seller.

## Estado atual

O botão já utiliza `routerLink="/offer"` em:

`src/app/feature/seller-onboarding-screen/seller-onboarding.component.ts`

A rota `/offer` está protegida por autenticação e exige uma das roles `SELLER` ou `ADMIN`:

```ts
{path: 'offer', component: ListOfferComponent,
  canActivate: [AuthGuard], data: {rolesAny: ['SELLER', 'ADMIN']}}
```

Ao carregar a tela, `ListOfferComponent` consulta as ofertas próprias pelo endpoint:

```text
GET /seller/offers?page=0&size=25&search=...
```

## Comportamento planejado

1. O usuário com role `SELLER` ou `ADMIN` acessa “Quero vender”.
2. O sistema exibe o botão “Ir para minhas offers”.
3. Ao clicar, o Angular navega para `/offer`.
4. O `AuthGuard` valida autenticação e autorização.
5. A tela de offers carrega somente as ofertas pertencentes ao usuário autenticado.
6. O usuário pode buscar, filtrar por status, paginar e abrir uma offer em `/offer/:id`.

## Regras de autorização

- Usuário não autenticado deve ser encaminhado pelo fluxo normal de login.
- Usuário autenticado sem `SELLER` ou `ADMIN` não pode acessar `/offer`.
- Seller deve consultar somente suas próprias offers.
- Admin pode acessar a tela conforme a política administrativa existente.
- A API continua sendo a autoridade final para autenticação, autorização e isolamento das ofertas.

## Sessão desatualizada

Quando uma solicitação de seller é aprovada, mas o token ainda não contém a role `SELLER`, a tela deve orientar o usuário a atualizar a sessão. O botão “Ir para minhas offers” só deve ser exibido no estado `hasSeller` reconhecido pelo token atual.

## Critérios de aceite

- O botão é exibido apenas quando `hasSeller` é verdadeiro.
- O clique navega para `/offer` sem chamada HTTP adicional no componente de onboarding.
- A rota `/offer` exige autenticação e role `SELLER` ou `ADMIN`.
- A listagem usa `GET /seller/offers` e preserva busca, filtros e paginação.
- Um seller não consegue visualizar offers de outro usuário, inclusive acessando diretamente `/offer/:id`.
- Em caso de sessão aprovada, mas desatualizada, o usuário consegue usar “Atualizar sessão” e retornar para `/offer`.

## Testes

Adicionar ou revisar testes para:

- renderização do botão no estado `hasSeller`;
- ausência do botão para usuário sem role `SELLER`;
- navegação para `/offer` ao clicar;
- proteção da rota para roles inválidas;
- consulta da listagem pelo endpoint `/seller/offers`;
- isolamento das offers no detalhe e na listagem.

## Arquivos envolvidos

- `src/app/feature/seller-onboarding-screen/seller-onboarding.component.ts`
- `src/app/app-routing.module.ts`
- `src/app/feature/offer-admin-screen/list-offer/list-offer.component.ts`
- `src/app/shared/service/offer.service.ts`
- testes correspondentes do onboarding, roteamento e `OfferService`

## Fora de escopo

- Criar uma nova rota para “minhas offers”.
- Alterar o contrato da API de offers.
- Implementar criação ou edição de offers a partir da tela “Quero vender”.
- Alterar o fluxo de aprovação de sellers.
