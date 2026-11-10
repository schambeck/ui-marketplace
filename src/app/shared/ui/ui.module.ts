import {Component, Input, NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({name: 'statusLabel'})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const labels: Record<string, string> = {
      AVAILABLE: 'Disponível', UNAVAILABLE: 'Indisponível', DRAFT: 'Rascunho', PUBLISHED: 'Publicada', PAUSED: 'Pausada', RETIRED: 'Encerrada',
      ACTIVE: 'Ativo', INACTIVE: 'Inativo', DISCONTINUED: 'Descontinuado', PENDING: 'Em análise', APPROVED: 'Aprovada', REJECTED: 'Rejeitada', WITHDRAWN: 'Retirada',
      CREATED: 'Criado', PAYMENT_PENDING: 'Aguardando pagamento', PAID: 'Pago', FULFILLING: 'Em preparação', PARTIALLY_DELIVERED: 'Entrega parcial', DELIVERED: 'Entregue', COMPLETED: 'Concluído', CANCELLED: 'Cancelado', EXPIRED: 'Expirado', REFUNDED: 'Reembolsado', DISPUTED: 'Em disputa',
      RESERVED: 'Reservado', ALLOCATED: 'Alocado', RELEASED: 'Liberado', CONSUMED: 'Consumido', PARTIALLY_CONSUMED: 'Consumo parcial'
    };
    return value ? labels[value] || value : '—';
  }
}
@Component({selector: 'app-page-header', template: `<header class="page-heading"><div><span class="eyebrow">{{section}}</span><h1>{{title}}</h1><p *ngIf="description">{{description}}</p></div><ng-content></ng-content></header>`})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() section = 'Marketplace';
}
@Component({selector: 'app-ui-state', template: `<div class="ui-state" role="status" aria-live="polite"><i [class]="'pi ' + icon" aria-hidden="true"></i><h2>{{title}}</h2><p>{{description}}</p><ng-content></ng-content></div>`})
export class UiStateComponent {
  @Input() icon = 'pi-inbox';
  @Input() title = 'Nenhum resultado';
  @Input() description = 'Tente ajustar sua busca.';
}
@NgModule({declarations: [PageHeaderComponent, UiStateComponent, StatusLabelPipe], imports: [CommonModule], exports: [PageHeaderComponent, UiStateComponent, StatusLabelPipe]})
export class UiModule {}
