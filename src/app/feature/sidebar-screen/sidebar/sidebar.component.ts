import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input()
  display?: boolean;

  @Output()
  displayChange = new EventEmitter<boolean>();

  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'General',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ["/home"]
          },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink: ["/profile"]
          },
          {
            label: 'Quero vender',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/become-seller']
          },
        ]
      },
      {
        label: 'Admin',
        items: [
          {
            label: 'User',
            icon: 'pi pi-fw pi-users',
            routerLink: ["/user"]
          },
          {
            label: 'Seller applications',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/seller-applications']
          },
          {
            label: 'Product',
            icon: 'pi pi-fw pi-cog',
            routerLink: ["/list-product"]
          },
          {
            label: 'Game Context',
            icon: 'pi pi-fw pi-sitemap',
            routerLink: ["/game-context"]
          },
          {
            label: 'Offer',
            icon: 'pi pi-fw pi-tags',
            routerLink: ["/offer"]
          },
          {
            label: 'Inventory',
            icon: 'pi pi-fw pi-box',
            routerLink: ["/inventory"]
          },
        ]
      },
      {
        label: 'Store',
        items: [
          {
            label: 'Catalog',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: ["/catalog"]
          }
        ]
      }
    ];
  }

  toggleDisplay(): void {
    this.display = !this.display;
    this.displayChange.emit(this.display);
  }

}
