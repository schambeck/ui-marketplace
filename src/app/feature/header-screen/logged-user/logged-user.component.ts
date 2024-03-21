import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthorizationService} from "../../../shared/service/authorization.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styles: [],
})
export class LoggedUserComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  username?: string;
  loggedInSubscription?: Subscription;

  constructor(public authService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.loggedInSubject.subscribe(loggedIn => {
      if (loggedIn) {
        this.authService.auth.user$.subscribe(profile => {
          if (profile) {
            let prop = "nickname" as keyof typeof profile;
            this.username = profile[prop];
            this.buildMenuLoggedIn();
          } else {
            this.buildMenuLoggedOut();
          }
        })
      } else {
        this.buildMenuLoggedOut();
      }
    })
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
  }

  buildMenuLoggedIn(): void {
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

  buildMenuLoggedOut(): void {
    this.items = [
      {
        label: 'Auth',
        items: [
          {label: 'Log in', icon: 'pi pi-fw pi-power-on', command: () => this.authService.login()}
        ]
      }
    ];
  }
}
