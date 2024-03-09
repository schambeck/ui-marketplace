import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = false;

  constructor(private readonly keycloak: KeycloakService) {
    this.loggedIn = this.keycloak.isLoggedIn();
  }

  public login(options?: Keycloak.KeycloakLoginOptions) {
    this.keycloak.login(options);
  }

  public logout() {
    this.keycloak.logout();
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
}
