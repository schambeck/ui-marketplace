# PLAN-027 — Tela “Meus pedidos”

**Status:** planejado  
**Escopo:** frontend Angular (`ui-marketplace`)  
**Dependências:** fluxo de checkout e detalhe de pedido existentes

## Objetivo

Criar uma tela autenticada para o comprador consultar seus pedidos, navegar entre as páginas da listagem e abrir o detalhe de um pedido específico.

## Estado atual

O frontend já possui:

- `OrderService.list(page, size)`, que consulta `GET /orders?page={page}&size={size}`;
- `OrderService.get(publicId)`, que consulta o detalhe;
- rota protegida `/orders/:id`;
- `OrderComponent`, que exibe o detalhe de um pedido após o checkout.

Ainda não existe uma tela ou rota `/orders` para listar todos os pedidos do usuário.

O backend já restringe a listagem ao comprador autenticado por meio de:

```text
GET /orders?page=0&size=20
Authorization: Bearer <token>
```

## Comportamento planejado

1. O usuário autenticado acessa `/orders`.
2. O componente chama `OrderService.list()` na primeira página.
3. A tela exibe os pedidos em ordem definida pela API, com status, referência e valores.
4. O usuário pode navegar pelas páginas usando o paginator.
5. Ao selecionar um pedido, o sistema navega para `/orders/{publicId}`.
6. A tela de detalhe oferece retorno para “Meus pedidos”.
7. Usuários não autenticados são tratados pelo `AuthGuard`.

## Interface proposta

Cada linha ou cartão deve exibir:

- referência pública do pedido;
- status atual;
- subtotal;
- valor total;
- ação “Ver detalhes”.

Estados obrigatórios:

- carregando;
- lista vazia;
- erro ao consultar a API;
- paginação;
- navegação para o detalhe.

## Arquivos previstos

Criar:

- `src/app/feature/order-screen/list-orders/list-orders.component.ts`;
- `src/app/feature/order-screen/list-orders/list-orders.component.html`;
- `src/app/feature/order-screen/list-orders/list-orders.component.css`, se necessário;

Alterar:

- `src/app/app-routing.module.ts`;
- `src/app/app.module.ts`;
- `src/app/feature/sidebar-screen/sidebar/sidebar.component.ts`;
- `src/app/feature/order-screen/order/order.component.html`;
- `src/app/feature/order-screen/order/order.component.ts`, se necessário para o botão de retorno;
- testes do componente e do serviço, conforme cobertura existente.

## Rota

Adicionar uma rota autenticada:

```ts
{ path: 'orders', component: ListOrdersComponent, canActivate: [AuthGuard] }
```

Manter a rota existente para detalhe:

```ts
{ path: 'orders/:id', component: OrderComponent, canActivate: [AuthGuard] }
```

Adicionar “Meus pedidos” ao menu de usuário autenticado, sem colocá-lo na seção administrativa.

## Serviço e contrato

Reutilizar:

```ts
list(page = 0, size = 20): Observable<Page<Order>>
```

Não calcular paginação localmente. A resposta paginada da API deve ser a autoridade para:

- conteúdo da página;
- total de elementos;
- total de páginas;
- página atual.

Na primeira versão, o modelo atual de `Order` é suficiente:

```ts
publicId: string;
status: OrderStatus;
subtotalAmount: number;
totalAmount: number;
```

## Autorização e segurança

- A rota deve exigir autenticação.
- A API deve continuar filtrando pedidos pelo comprador autenticado.
- O frontend não deve aceitar um usuário ou identificador de comprador como parâmetro de consulta.
- O `publicId` pode ser exibido como referência, sem expor IDs internos do banco.
- O detalhe deve continuar validando a autorização no backend.

## Testes

Adicionar testes para:

- carregamento inicial usando `OrderService.list(0, 20)`;
- envio correto de `page` e `size` ao paginar;
- renderização de pedidos e status;
- estado de lista vazia;
- estado de erro da API;
- navegação para `/orders/{publicId}`;
- proteção da rota por autenticação;
- botão de retorno do detalhe para `/orders`.

## Critérios de aceite

- Usuário autenticado acessa `/orders`.
- A tela consulta `OrderService.list()`.
- Os pedidos são exibidos de forma paginada.
- A tela informa quando não há pedidos.
- Erros de consulta são exibidos de forma compreensível.
- Cada pedido abre sua tela de detalhe.
- O botão “Meus pedidos” aparece no menu apropriado.
- Usuário não autenticado não acessa a tela.
- Build e testes do Angular passam.

## Fora de escopo

- Alterar o lifecycle de pedidos.
- Criar filtros avançados por status ou período.
- Alterar autorização ou persistência no backend.
- Cancelar, pagar, reembolsar ou acompanhar fulfillment pela nova tela.
- Exibir reservas e movimentos de inventory na listagem de pedidos.
