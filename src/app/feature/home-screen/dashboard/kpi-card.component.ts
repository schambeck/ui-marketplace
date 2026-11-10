import {Component, Input} from '@angular/core';
import {DashboardMetric} from './dashboard.model';

@Component({
  selector: 'app-dashboard-kpi',
  template: `<article [attr.aria-busy]="metric.state === 'loading'">
    <div class="label"><i class="pi" [ngClass]="metric.icon" aria-hidden="true"></i><h2>{{metric.title}}</h2></div>
    <span *ngIf="metric.state === 'loading'" class="skeleton" role="status" aria-label="Carregando indicador"></span>
    <strong *ngIf="metric.state === 'success'">{{metric.value | number:'1.0-0':'pt-BR'}}</strong>
    <p *ngIf="metric.state === 'error'" role="alert">Não foi possível carregar. <button (click)="retry()">Tentar novamente</button></p>
    <p>{{metric.detail}}</p><a [routerLink]="metric.route">{{metric.actionLabel || 'Consultar'}} <i class="pi pi-arrow-right" aria-hidden="true"></i></a>
  </article>`,
  styles: [`:host{display:block;min-width:0}article{height:100%;padding:var(--space-5);border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--surface)}.label{display:flex;align-items:center;gap:.75rem;color:var(--text-secondary)}h2{font-size:.9rem;font-weight:600;margin:0}i{color:var(--brand)}strong{display:block;font-size:2.3rem;letter-spacing:-.04em;margin:1rem 0;font-variant-numeric:tabular-nums}p{font-size:.85rem;line-height:1.5;color:var(--text-secondary)}a{display:inline-flex;align-items:center;gap:.5rem;min-height:44px;text-decoration:none;font-weight:600}button{color:var(--brand);background:transparent;border:0;min-height:44px;cursor:pointer;text-decoration:underline}.skeleton{display:block;width:55%;height:2.7rem;background:var(--surface-muted);border-radius:var(--radius);margin:1rem 0}`]
})
export class KpiCardComponent {
  @Input({required: true}) metric!: DashboardMetric;
  @Input() retry: () => void = () => {};
}
