import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {KeycloakService} from "keycloak-angular";

describe('AuthService', () => {
  let service: AuthService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    TestBed.configureTestingModule({
      providers: [{ provide: KeycloakService, useValue: keycloakServiceSpy }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
