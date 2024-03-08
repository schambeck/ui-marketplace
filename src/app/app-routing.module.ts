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
import {AuthGuard} from "./shared/service/auth-guard";
import {ProfileComponent} from "./feature/profile-screen/profile/profile.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user', component: ListUserComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ListProductComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'catalog', component: ListCatalogComponent, canActivate: [AuthGuard]},
  {path: 'catalog/:id', component: ViewProductComponent, canActivate: [AuthGuard]},
  {path: 'shopping-cart', component: ListShoppingCartItemComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
