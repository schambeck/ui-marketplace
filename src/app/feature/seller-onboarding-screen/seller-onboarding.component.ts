import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';
import {KeycloakService} from 'keycloak-angular';
import {SellerApplication, SellerApplicationRequest} from '../../shared/model/seller-application.model';
import {SellerApplicationService} from '../../shared/service/seller-application.service';

@Component({
  selector: 'app-seller-onboarding',
  templateUrl: './seller-onboarding.component.html'
})
export class SellerOnboardingComponent implements OnInit {
  application: SellerApplication | null = null;
  loading = true;
  error = false;
  saving = false;
  hasSeller = false;
  request: SellerApplicationRequest = {publicName: '', description: '', contactEmail: '', itemTypes: '', deliveryMethod: '', termsVersion: '1', termsAccepted: false};
  constructor(private service: SellerApplicationService, private messages: MessageService, private keycloak: KeycloakService) {}
  ngOnInit(): void {
    this.hasSeller = this.keycloak.getUserRoles().some(role => role.toLowerCase() === 'seller');
    this.service.mine().pipe(finalize(() => this.loading = false)).subscribe({next: value => this.application = value, error: () => this.error = true});
  }
  submit(): void {
    this.saving = true;
    this.service.submit(this.request).pipe(finalize(() => this.saving = false)).subscribe(value => {
      this.application = value;
      this.messages.add({severity: 'success', summary: 'Solicitação enviada'});
    });
  }
  refreshSession(): void { this.keycloak.login({redirectUri: window.location.origin + '/offer'}); }
}
