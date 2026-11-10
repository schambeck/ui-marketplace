import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';
import {SellerApplication} from '../../shared/model/seller-application.model';
import {SellerApplicationService} from '../../shared/service/seller-application.service';

@Component({selector: 'app-seller-admin', template: `<p-panel header="Solicitações de seller"><p-card>
  <p-table [value]="applications"><ng-template pTemplate="header"><tr><th>Loja</th><th>Contato</th><th>Itens</th><th>Entrega</th><th>Descrição</th><th>Decisão</th></tr></ng-template>
  <ng-template pTemplate="body" let-app><tr><td>{{app.publicName}}</td><td>{{app.contactEmail}}</td><td>{{app.itemTypes}}</td><td>{{app.deliveryMethod}}</td><td>{{app.description}}</td><td><input pInputText [(ngModel)]="reasons[app.id]" placeholder="Justificativa"/><p-button label="Aprovar" icon="pi pi-check" (onClick)="decide(app, true)"></p-button><p-button label="Rejeitar" icon="pi pi-times" severity="danger" (onClick)="decide(app, false)"></p-button></td></tr></ng-template></p-table>
  <p-progressSpinner *ngIf="loading"></p-progressSpinner>
</p-card></p-panel>`})
export class SellerAdminComponent implements OnInit {
  applications: SellerApplication[] = []; reasons: Record<number, string> = {}; loading = false;
  constructor(private service: SellerApplicationService, private messages: MessageService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.loading = true; this.service.pending().pipe(finalize(() => this.loading = false)).subscribe(page => this.applications = page.content); }
  decide(app: SellerApplication, approve: boolean): void {
    this.service.decide(app.id, approve, this.reasons[app.id] || '').subscribe(() => {
      this.messages.add({severity: 'success', summary: approve ? 'Seller aprovado' : 'Solicitação rejeitada'}); this.load();
    });
  }
}
