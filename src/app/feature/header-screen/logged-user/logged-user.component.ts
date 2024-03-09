import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthService} from "../../../shared/service/auth.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styles: [],
})
export class LoggedUserComponent {

  items!: MenuItem[];
  username?: string;

  constructor(public authService: AuthService,
              private readonly keycloak: KeycloakService) {
    if (this.keycloak.isLoggedIn()) {
      this.keycloak.getKeycloakInstance().loadUserInfo().then(value => {
        let prop = "preferred_username" as keyof typeof value;
        this.username = value[prop];
        this.buildMenu();
      });
    }
  }

  buildMenu(): void {
    this.items = [
      {
        label: this.username,
        items: [
          {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: "/profile"},
          {label: 'Log out', icon: 'pi pi-fw pi-power-off', command: () => this.authService.logout()}
        ]
      }
    ];
  }

}
