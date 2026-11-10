import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
@Component({selector: 'app-sidebar', templateUrl: './sidebar.component.html', styleUrls: ['./sidebar.component.css']})
export class SidebarComponent {
  @Input() display?: boolean;
  @Output() displayChange = new EventEmitter<boolean>();
  constructor(private keycloak: KeycloakService) {}
  get isAdmin(): boolean { return this.hasRole('admin'); }
  get isSeller(): boolean { return this.isAdmin || this.hasRole('seller'); }
  private hasRole(role: string): boolean { return this.keycloak.getUserRoles().some(value => value.trim().toLowerCase() === role); }
  toggleDisplay(): void { this.displayChange.emit(false); }
}
