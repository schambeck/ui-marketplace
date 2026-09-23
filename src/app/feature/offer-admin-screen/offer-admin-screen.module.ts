import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import {TagModule} from 'primeng/tag';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {ListOfferComponent} from './list-offer/list-offer.component';
import {EditOfferComponent} from './edit-offer/edit-offer.component';

@NgModule({
  declarations: [ListOfferComponent, EditOfferComponent],
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    TagModule,
    ProgressSpinnerModule
  ],
  exports: [ListOfferComponent, EditOfferComponent]
})
export class OfferAdminScreenModule {}
