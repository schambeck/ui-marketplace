import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styles: [],
})
export class LoggedUserComponent {

  items!: MenuItem[];
  username?: string;

  constructor() {
    this.buildMenu();
  }

  buildMenu(): void {
    this.items = [
      {
        label: this.username,
        items: [
          {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: "/profile"},
          {label: 'Log out', icon: 'pi pi-fw pi-power-off', command: () => {}}
        ]
      }
    ];
  }

}
