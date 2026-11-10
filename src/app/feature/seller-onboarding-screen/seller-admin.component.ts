import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {MessageService} from 'primeng/api';
import {SellerApplication} from '../../shared/model/seller-application.model';
import {SellerApplicationService} from '../../shared/service/seller-application.service';

@Component({selector: 'app-seller-admin', templateUrl: './seller-admin.component.html'})
export class SellerAdminComponent implements OnInit {
  error = false;
  deciding = false;
  applications: SellerApplication[] = []; reasons: Record<number, string> = {}; loading = false;
  constructor(private service: SellerApplicationService, private messages: MessageService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.loading = true; this.error = false; this.service.pending().pipe(finalize(() => this.loading = false)).subscribe({next: page => this.applications = page.content, error: () => this.error = true}); }
  decide(app: SellerApplication, approve: boolean): void {
    this.deciding = true;
    this.service.decide(app.id, approve, this.reasons[app.id] || '').pipe(finalize(() => this.deciding = false)).subscribe(() => {
      this.messages.add({severity: 'success', summary: approve ? 'Vendedor aprovado' : 'Solicitação rejeitada'}); this.load();
    });
  }
}
