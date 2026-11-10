import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InventoryAllocation, InventoryOrder, InventoryReservation} from '../../../shared/model/inventory.entity';
import {InventoryService} from '../../../shared/service/inventory.service';

@Component({selector: 'app-inventory-screen', templateUrl: './inventory-screen.component.html'})
export class InventoryScreenComponent {
  orderId = '';
  inventory?: InventoryOrder;
  loading = false;
  error = '';
  operationLoading = false;

  constructor(private inventoryService: InventoryService, route: ActivatedRoute) {
    this.orderId = route.snapshot.queryParamMap.get('orderId') || '';
  }

  load(): void {
    if (!this.orderId.trim()) { this.error = 'Informe o identificador público do pedido.'; return; }
    this.loading = true; this.error = '';
    this.inventoryService.getOrder(this.orderId.trim()).subscribe({
      next: value => this.inventory = value,
      error: response => { this.inventory = undefined; this.error = response?.error?.message || 'Não foi possível carregar o inventory.'; },
      complete: () => this.loading = false
    });
  }

  allocate(reservation: InventoryReservation): void {
    this.operationLoading = true;
    this.inventoryService.allocate(reservation.id, reservation.quantity, crypto.randomUUID()).subscribe({next: () => this.load(), error: e => this.fail(e), complete: () => this.operationLoading = false});
  }

  release(reservation: InventoryReservation): void {
    this.operationLoading = true;
    this.inventoryService.release(reservation.id, crypto.randomUUID()).subscribe({next: () => this.load(), error: e => this.fail(e), complete: () => this.operationLoading = false});
  }

  expire(reservation: InventoryReservation): void {
    this.operationLoading = true;
    this.inventoryService.expire(reservation.id, crypto.randomUUID()).subscribe({next: () => this.load(), error: e => this.fail(e), complete: () => this.operationLoading = false});
  }

  consume(allocation: InventoryAllocation): void {
    const remaining = allocation.quantity - allocation.consumedQuantity;
    this.operationLoading = true;
    this.inventoryService.consumeAllocation(allocation.id, remaining, crypto.randomUUID()).subscribe({next: () => this.load(), error: e => this.fail(e), complete: () => this.operationLoading = false});
  }

  private fail(response: any): void {
    this.error = response?.error?.message || 'A operação de inventory falhou.';
    this.operationLoading = false;
  }
}
