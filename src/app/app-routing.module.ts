import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./feature/home-screen/home/home.component";
import {PageNotFoundComponent} from "./feature/page-not-found-screen/page-not-found/page-not-found.component";
import {ListProductComponent} from "./feature/product-screen/list-product/list-product.component";
import {ListUserComponent} from "./feature/user-screen/list-user/list-user.component";
import {ListCatalogComponent} from "./feature/catalog-screen/list-catalog/list-catalog.component";
import {EditProductComponent} from "./feature/product-screen/edit-product/edit-product.component";
import {EditUserComponent} from "./feature/user-screen/edit-user/edit-user.component";
import {ViewProductComponent} from "./feature/catalog-screen/view-product/view-product.component";
import {ListShoppingCartItemComponent} from "./feature/shopping-cart-screen/list-shopping-cart-item/list-shopping-cart-item.component";
import {AuthGuard} from "./shared/service/auth-guard";
import {ProfileComponent} from "./feature/profile-screen/profile/profile.component";
import {CheckoutComponent} from "./feature/checkout-screen/checkout/checkout.component";
import {PaymentComponent} from "./feature/payment-screen/payment/payment.component";
import {ViewLoggedUserComponent} from "./feature/user-screen/view-logged-user/view-logged-user.component";
import {ListGameContextComponent} from "./feature/game-context-screen/list-game-context/list-game-context.component";
import {EditGameContextComponent} from "./feature/game-context-screen/edit-game-context/edit-game-context.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user', component: ListUserComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: 'view-logged-user', component: ViewLoggedUserComponent, canActivate: [AuthGuard]},
  {path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard]},
  {path: 'edit-product', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'game-context', component: ListGameContextComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'game-context/new', component: EditGameContextComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'game-context/:id', component: EditGameContextComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path: 'catalog', component: ListCatalogComponent},
  {path: 'catalog/:id', component: ViewProductComponent},
  {path: 'shopping-cart', component: ListShoppingCartItemComponent, canActivate: [AuthGuard]},
  {path: 'shopping-cart/:id', component: ListShoppingCartItemComponent, canActivate: [AuthGuard]},
  {path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent},
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
