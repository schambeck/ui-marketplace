import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared-module";
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule} from "@angular/common/http";
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
import {ProfileScreenModule} from "./feature/profile-screen/profile-screen.module";
import {CheckoutScreenModule} from "./feature/checkout-screen/checkout-screen.module";
import {PaymentScreenModule} from "./feature/payment-screen/payment-screen.module";
import {AuthClientConfig, AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import {environment} from "../environments/environment";

const configInitializer = (
  handler: HttpBackend,
  config: AuthClientConfig
): (() => Promise<any>) => () =>
  new HttpClient(handler)
    .get('/assets/config.json')
    .toPromise()
    .then((loadedConfig: any) => config.set(loadedConfig)); // Set the config that was loaded asynchronously here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
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
    ShoppingCartScreenModule,
    ProfileScreenModule,
    CheckoutScreenModule,
    PaymentScreenModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializer,
      deps: [HttpBackend, AuthClientConfig],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
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
