import {UiModule} from '../../shared/ui/ui.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {ListOrdersComponent} from './list-orders/list-orders.component';
import {OrderComponent} from './order/order.component';

@NgModule({
  declarations: [ListOrdersComponent, OrderComponent],
  imports: [
    UiModule, CommonModule, ButtonModule, CardModule, MessageModule, PaginatorModule, PanelModule,
    ProgressSpinnerModule, SkeletonModule, TableModule, TagModule],
  exports: [ListOrdersComponent, OrderComponent]
})
export class OrderScreenModule {}
