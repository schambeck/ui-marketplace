import {UiModule} from '../../shared/ui/ui.module';
import {CommonModule} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {MessageService} from 'primeng/api';
import {KeycloakService} from 'keycloak-angular';

import {SellerOnboardingComponent} from './seller-onboarding.component';
import {SellerApplicationService} from '../../shared/service/seller-application.service';

describe('SellerOnboardingComponent', () => {
  let component: SellerOnboardingComponent;
  let fixture: ComponentFixture<SellerOnboardingComponent>;
  let keycloak: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    keycloak = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['getUserRoles']);
    keycloak.getUserRoles.and.returnValue(['SELLER']);

    await TestBed.configureTestingModule({
      imports: [UiModule, CommonModule, FormsModule, RouterTestingModule],
      declarations: [SellerOnboardingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: KeycloakService, useValue: keycloak},
        {provide: SellerApplicationService, useValue: {mine: () => of(null)}},
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the link to owned offers for a seller', () => {
    const button = fixture.nativeElement.querySelector('p-button');

    expect(component.hasSeller).toBeTrue();
    expect(button).not.toBeNull();
    expect(button.getAttribute('routerLink')).toBe('/offer');
  });

  it('does not show the link to owned offers without the seller role', () => {
    component.hasSeller = false;
    component.loading = true;
    fixture.detectChanges();

    expect(component.hasSeller).toBeFalse();
    expect(fixture.nativeElement.querySelector('p-button')).toBeNull();
  });
});
