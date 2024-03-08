import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {ProfileScreenModule} from "./feature/profile-screen/profile-screen.module";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://keycloak.localhost:9000',
        realm: 'marketplace',
        clientId: 'ui-marketplace'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
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
    ProfileScreenModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
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
