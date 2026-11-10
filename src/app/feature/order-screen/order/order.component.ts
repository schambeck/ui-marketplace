import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../shared/model/order.entity';
import {OrderService} from '../../../shared/service/order.service';
import {MessageService} from 'primeng/api';

@Component({selector: 'app-order', templateUrl: './order.component.html'})
export class OrderComponent implements OnInit {
  order?: Order; loading = true; error = false;
  paying = false;
  constructor(private route: ActivatedRoute, private orders: OrderService, private router: Router,
              private messages: MessageService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = true; this.loading = false; return; }
    this.orders.get(id).subscribe({next: order => this.order = order, error: () => this.error = true, complete: () => this.loading = false});
  }
  back(): void { this.router.navigate(['/orders']); }
  pay(): void {
    if (!this.order) return;
    this.paying = true;
    const key = `order:${this.order.publicId}:preference`;
    this.orders.createPreference(this.order.publicId, key).subscribe({
      next: preference => this.router.navigate(['/checkout', preference.id]),
      error: error => { this.paying = false; this.messages.add({severity: 'error', summary: 'Pagamento indisponível', detail: error?.error?.message || 'Não foi possível iniciar o pagamento.'}); },
      complete: () => this.paying = false
    });
  }
}
