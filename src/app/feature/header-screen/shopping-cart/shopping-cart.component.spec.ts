import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {KeycloakService} from "keycloak-angular";

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['isLoggedIn']);
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceSpy }],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
