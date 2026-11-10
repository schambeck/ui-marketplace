import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';
import {KeycloakService} from 'keycloak-angular';
import {SellerApplication, SellerApplicationRequest} from '../../shared/model/seller-application.model';
import {SellerApplicationService} from '../../shared/service/seller-application.service';

@Component({
  selector: 'app-seller-onboarding',
  template: `<p-panel header="Quero vender"><p-card>
    <ng-container *ngIf="!loading; else busy">
      <ng-container *ngIf="hasSeller; else applicationFlow">
        <p>Sua conta já tem acesso de seller. Você não precisa enviar outra solicitação.</p>
        <p-button label="Ir para minhas offers" icon="pi pi-tags" routerLink="/offer"></p-button>
      </ng-container>
      <ng-template #applicationFlow>
      <ng-container *ngIf="application; else form">
        <h3>Solicitação {{application.status}}</h3>
        <p>{{application.publicName}} · enviada em {{application.submittedAt | date:'short'}}</p>
        <p *ngIf="application.decisionReason">{{application.decisionReason}}</p>
        <p *ngIf="application.status === 'APPROVED'">Seu perfil de seller foi aprovado. Atualize sua sessão para acessar as ferramentas de venda.</p>
        <p-button *ngIf="application.status === 'APPROVED'" label="Atualizar sessão" icon="pi pi-refresh" (onClick)="refreshSession()"></p-button>
        <p-button *ngIf="application.status === 'REJECTED' || application.status === 'WITHDRAWN'" label="Enviar nova solicitação" (onClick)="application = null"></p-button>
      </ng-container>
      <ng-template #form>
        <p>Preencha os dados do seu perfil de vendedor. Você continuará podendo comprar enquanto analisamos a solicitação.</p>
        <div class="field"><label>Nome público/loja</label><input pInputText class="w-full" [(ngModel)]="request.publicName" /></div>
        <div class="field"><label>Descrição</label><textarea pInputTextarea class="w-full" [(ngModel)]="request.description"></textarea></div>
        <div class="field"><label>Email de contato</label><input pInputText type="email" class="w-full" [(ngModel)]="request.contactEmail" /></div>
        <div class="field"><label>Tipos de itens</label><input pInputText class="w-full" [(ngModel)]="request.itemTypes" /></div>
        <div class="field"><label>Método de entrega</label><input pInputText class="w-full" [(ngModel)]="request.deliveryMethod" /></div>
        <div class="field"><p-checkbox [(ngModel)]="request.termsAccepted" [binary]="true" inputId="sellerTerms"></p-checkbox><label for="sellerTerms">Aceito os termos para sellers ({{request.termsVersion}})</label></div>
        <p-button label="Enviar solicitação" icon="pi pi-send" [loading]="saving" (onClick)="submit()"></p-button>
      </ng-template>
      </ng-template>
    </ng-container>
    <ng-template #busy><p-progressSpinner></p-progressSpinner></ng-template>
  </p-card></p-panel>`
})
export class SellerOnboardingComponent implements OnInit {
  application: SellerApplication | null = null;
  loading = true;
  saving = false;
  hasSeller = false;
  request: SellerApplicationRequest = {publicName: '', description: '', contactEmail: '', itemTypes: '', deliveryMethod: '', termsVersion: '1', termsAccepted: false};
  constructor(private service: SellerApplicationService, private messages: MessageService, private keycloak: KeycloakService) {}
  ngOnInit(): void {
    this.hasSeller = this.keycloak.getUserRoles().some(role => role.toLowerCase() === 'seller');
    this.service.mine().pipe(finalize(() => this.loading = false)).subscribe(value => this.application = value);
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
