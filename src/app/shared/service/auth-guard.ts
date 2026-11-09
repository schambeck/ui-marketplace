import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get only valid, non-empty role names configured on the route.
    const requiredRoles = (route.data?.['roles'] ?? [])
      .filter((role: unknown): role is string => typeof role === 'string')
      .map((role: string) => role.trim().toLowerCase())
      .filter((role: string) => role.length > 0);

    // Allow the user to proceed if no additional roles are required to access the route.
    if (requiredRoles.length === 0) {
      return true;
    }

    // A route may require more than one role: the user must contain all of them.
    const userRoles = new Set((this.roles ?? []).map((role) => role.trim().toLowerCase()));
    return requiredRoles.every((role: string) => userRoles.has(role));
  }
}
