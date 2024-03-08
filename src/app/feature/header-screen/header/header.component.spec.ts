import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {KeycloakService} from "keycloak-angular";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
