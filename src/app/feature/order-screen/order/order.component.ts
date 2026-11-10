import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../shared/model/order.entity';
import {OrderService} from '../../../shared/service/order.service';

@Component({selector: 'app-order', templateUrl: './order.component.html'})
export class OrderComponent implements OnInit {
  order?: Order; loading = true; error = false;
  constructor(private route: ActivatedRoute, private orders: OrderService, private router: Router) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = true; this.loading = false; return; }
    this.orders.get(id).subscribe({next: order => this.order = order, error: () => this.error = true, complete: () => this.loading = false});
  }
  back(): void { this.router.navigate(['/orders']); }
}
