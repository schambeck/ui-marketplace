import {Injectable} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {MessageService} from "primeng/api";
import {RedirectLoginOptions} from "@auth0/auth0-angular/lib/interfaces";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public loggedIn = false;
  public loggedInSubject = new Subject<boolean>();

  constructor(public auth: AuthService,
              private messageService: MessageService) {
    this.auth.isAuthenticated$.subscribe({
      next: authenticated => {
        this.loggedInSubject.next(authenticated);
        this.loggedIn = authenticated;
      },
      error: err => {
        this.loggedIn = false;
        this.loggedInSubject.next(false);
        this.messageService.add({severity: 'error', summary: 'Error Auth0 Authenticating', detail: `${JSON.stringify(err)}`});
      },
      complete: () => {
        this.loggedInSubject.next(false);
        this.loggedIn = false;
      }
    });
  }

  public login(options?: RedirectLoginOptions<any>) {
    this.auth.loginWithRedirect(options);
  }

  public logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
}
