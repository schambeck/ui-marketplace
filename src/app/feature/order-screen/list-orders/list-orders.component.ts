import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Order} from '../../../shared/model/order.entity';
import {OrderStatus} from '../../../shared/model/order-status';
import {Page} from '../../../shared/model/page';
import {OrderService} from '../../../shared/service/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  readonly rows = 20;
  readonly skeletonRows = [{}, {}, {}, {}, {}];
  page$?: Observable<Page<Order>>;
  totalElements = 0;
  currentPage = 0;
  loading = false;
  error = false;

  constructor(private orders: OrderService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Meus pedidos');
    this.page$ = this.load();
  }

  load(page = this.currentPage): Observable<Page<Order>> {
    this.loading = true;
    this.currentPage = page;
    this.error = false;
    const result = this.orders.list(page, this.rows).pipe(tap({
      next: response => this.totalElements = response.totalElements,
      error: () => { this.error = true; this.loading = false; },
      complete: () => this.loading = false
    }));
    return result;
  }

  refresh(): void {
    this.page$ = this.load();
  }

  paginate(event: {page?: number}): void {
    this.page$ = this.load(event.page ?? 0);
  }

  open(order: Order): void {
    this.router.navigate(['/orders', order.publicId]);
  }

  getSeverity(status: OrderStatus): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'PAID':
      case 'DELIVERED':
      case 'COMPLETED': return 'success';
      case 'PAYMENT_PENDING':
      case 'FULFILLING':
      case 'PARTIALLY_DELIVERED': return 'warning';
      case 'REJECTED':
      case 'CANCELLED':
      case 'EXPIRED':
      case 'REFUNDED':
      case 'DISPUTED': return 'danger';
      default: return 'info';
    }
  }
}
