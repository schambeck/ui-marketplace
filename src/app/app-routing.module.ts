import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./feature/home-screen/home/home.component";
import {PageNotFoundComponent} from "./feature/page-not-found-screen/page-not-found/page-not-found.component";
import {ListProductComponent} from "./feature/product-screen/list-product/list-product.component";
import {ListUserComponent} from "./feature/user-screen/list-user/list-user.component";
import {ListCatalogComponent} from "./feature/catalog-screen/list-catalog/list-catalog.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user', component: ListUserComponent},
  {path: 'product', component: ListProductComponent},
  {path: 'catalog', component: ListCatalogComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
