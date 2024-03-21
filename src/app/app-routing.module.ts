import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./feature/home-screen/home/home.component";
import {PageNotFoundComponent} from "./feature/page-not-found-screen/page-not-found/page-not-found.component";
import {ListProductComponent} from "./feature/product-screen/list-product/list-product.component";
import {ListUserComponent} from "./feature/user-screen/list-user/list-user.component";
import {ListCatalogComponent} from "./feature/catalog-screen/list-catalog/list-catalog.component";
import {EditProductComponent} from "./feature/product-screen/edit-product/edit-product.component";
import {EditUserComponent} from "./feature/user-screen/edit-user/edit-user.component";
import {ViewProductComponent} from "./feature/catalog-screen/view-product/view-product.component";
import {ListShoppingCartItemComponent} from "./feature/shopping-cart-screen/list-shopping-cart-item/list-shopping-cart-item.component";
import {authGuardFn} from "@auth0/auth0-angular";
import {ProfileComponent} from "./feature/profile-screen/profile/profile.component";
import {CheckoutComponent} from "./feature/checkout-screen/checkout/checkout.component";
import {PaymentComponent} from "./feature/payment-screen/payment/payment.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuardFn]},
  {path: 'user', component: ListUserComponent, canActivate: [authGuardFn]},
  {path: 'user/:id', component: EditUserComponent, canActivate: [authGuardFn]},
  {path: 'list-product', component: ListProductComponent, canActivate: [authGuardFn]},
  {path: 'edit-product', component: EditProductComponent, canActivate: [authGuardFn]},
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [authGuardFn]},
  {path: 'catalog', component: ListCatalogComponent},
  {path: 'catalog/:id', component: ViewProductComponent},
  {path: 'shopping-cart', component: ListShoppingCartItemComponent, canActivate: [authGuardFn]},
  {path: 'shopping-cart/:id', component: ListShoppingCartItemComponent, canActivate: [authGuardFn]},
  {path: 'checkout/:id', component: CheckoutComponent, canActivate: [authGuardFn]},
  {path: 'payment', component: PaymentComponent},
  {path: '', redirectTo: '/catalog', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
