import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared-module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {HeaderScreenModule} from "./feature/header-screen/header-screen.module";
import {SidebarScreenModule} from "./feature/sidebar-screen/sidebar-screen.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToastModule} from "primeng/toast";
import {ErrorHttpInterceptorService} from "./shared/service/error-http-interceptor.service";
import {CustomAutocompleteModule} from "./feature/custom-autocomplete-component/custom-autocomplete.module";
import {FormsModule} from "@angular/forms";
import {PageNotFoundScreenModule} from "./feature/page-not-found-screen/page-not-found-screen.module";
import {HomeScreenModule} from "./feature/home-screen/home-screen.module";
import {UserScreenModule} from "./feature/user-screen/user-screen.module";
import {ProductScreenModule} from "./feature/product-screen/product-screen.module";
import {CatalogScreenModule} from "./feature/catalog-screen/catalog-screen.module";
import {ShoppingCartScreenModule} from "./feature/shopping-cart-screen/shopping-cart-screen.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HeaderScreenModule,
    SidebarScreenModule,
    HomeScreenModule,
    PageNotFoundScreenModule,
    ProgressSpinnerModule,
    ToastModule,
    CustomAutocompleteModule,
    UserScreenModule,
    ProductScreenModule,
    CatalogScreenModule,
    ShoppingCartScreenModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptorService,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
