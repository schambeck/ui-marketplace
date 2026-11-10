import {Component, Input} from '@angular/core';
import {DashboardMetric} from './dashboard.model';

@Component({
  selector: 'app-dashboard-offer-chart',
  template: `<p>Distribuição das suas ofertas por publicação. Disponibilidade é uma dimensão independente.</p>
    <p *ngIf="loading" role="status">Carregando distribuição…</p>
    <p *ngIf="failed" role="alert">Distribuição indisponível. Atualize para tentar novamente.</p>
    <ng-container *ngIf="!loading && !failed">
      <p *ngIf="total === 0">Você ainda não possui ofertas.</p>
      <p *ngIf="total > 0">{{total | number:'1.0-0':'pt-BR'}} ofertas no total.</p>
      <div *ngFor="let metric of metrics" class="chart-row">
        <div class="legend"><span>{{metric.title}}</span><span>{{metric.value | number:'1.0-0':'pt-BR'}} · {{percentage(metric) | number:'1.0-1':'pt-BR'}}%</span></div>
        <div class="track" role="img" [attr.aria-label]="metric.title + ': ' + metric.value + ' ofertas'" [title]="metric.title + ': ' + metric.value + ' ofertas'"><span [style.width.%]="percentage(metric)"></span></div>
      </div>
    </ng-container>`,
  styles: [`p{color:var(--text-secondary);line-height:1.6}.chart-row{margin:1.25rem 0}.legend{display:flex;justify-content:space-between;gap:1rem;font-size:.9rem;margin-bottom:.5rem;font-variant-numeric:tabular-nums}.track{height:12px;background:var(--surface-muted);border-radius:6px;overflow:hidden}.track span{display:block;height:100%;background:var(--brand);border-radius:6px}`]
})
export class OfferChartComponent {
  @Input() metrics: DashboardMetric[] = [];
  get loading(): boolean { return this.metrics.length !== 4 || this.metrics.some(item => item.state === 'loading'); }
  get failed(): boolean { return this.metrics.some(item => item.state === 'error'); }
  get total(): number { return this.metrics.reduce((total, item) => total + (item.value ?? 0), 0); }
  percentage(metric: DashboardMetric): number { return this.total ? (metric.value ?? 0) / this.total * 100 : 0; }
}
