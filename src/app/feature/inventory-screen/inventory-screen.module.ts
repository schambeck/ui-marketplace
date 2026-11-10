import {UiModule} from '../../shared/ui/ui.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InventoryScreenComponent} from './inventory-screen/inventory-screen.component';

@NgModule({
  declarations: [InventoryScreenComponent],
  imports: [
    UiModule, CommonModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule,
    CardModule, TableModule, TagModule, MessageModule, ProgressSpinnerModule],
  exports: [InventoryScreenComponent]
})
export class InventoryScreenModule {}
