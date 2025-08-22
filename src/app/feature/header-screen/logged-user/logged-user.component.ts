import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from "../../../shared/service/auth.service";
import { KeycloakService } from "keycloak-angular";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styles: [],
})
export class LoggedUserComponent implements OnInit, OnDestroy {

  items!: MenuItem[];
  username?: string;
  loggedInSubscription?: Subscription;

  constructor(public authService: AuthService,
              private readonly keycloak: KeycloakService) {
  }

  ngOnInit(): void {
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
          {label: 'User', icon: 'pi pi-fw pi-user', routerLink: "/view-logged-user"},
          {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: "/profile"},
          {label: 'Log out', icon: 'pi pi-fw pi-power-off', command: () => this.authService.logout()}
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
  }
}
