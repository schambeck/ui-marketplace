import {Component, Input} from '@angular/core';
import {DashboardAction} from './dashboard.model';

@Component({
  selector: 'app-dashboard-actions',
  template: `<section class="quick-section"><h2>Ações rápidas</h2><div class="quick-links"><a *ngFor="let action of actions" [routerLink]="action.route"><i class="pi" [ngClass]="action.icon" aria-hidden="true"></i><h3>{{action.title}}</h3><p>{{action.description}}</p><span>Acessar →</span></a></div></section>`,
  styles: [`.quick-links {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:1rem
}
.quick-links a {
  display:block;
  text-decoration:none;
  color:var(--text);
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:var(--radius-lg);
  padding:1.25rem
}
.quick-links a:hover {
  border-color:var(--brand)
}
.quick-links i,.quick-links span {
  color:var(--brand)
}
.quick-links p {
  font-size:.9rem
}
h2 {font-size:1.1rem;margin:0 0 1rem} h3 {font-size:1rem} p {color:var(--text-secondary);line-height:1.6} @media(max-width:767px) {.quick-links {grid-template-columns:minmax(0,1fr)}}`]
})
export class QuickActionsComponent {
  @Input() actions: DashboardAction[] = [];
}
