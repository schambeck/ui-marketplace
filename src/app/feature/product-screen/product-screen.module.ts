import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {ListProductComponent} from './list-product/list-product.component';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkeletonModule} from 'primeng/skeleton';
import {AccordionModule} from 'primeng/accordion';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {EditProductComponent} from './edit-product/edit-product.component';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarModule} from "primeng/toolbar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CustomAutocompleteModule} from "../custom-autocomplete-component/custom-autocomplete.module";
import {CalendarModule} from "primeng/calendar";
import {DataViewModule} from "primeng/dataview";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";

@NgModule({
  declarations: [
    ListProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PanelModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    CardModule,
    SkeletonModule,
    AccordionModule,
    TooltipModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ToolbarModule,
    AutoCompleteModule,
    CustomAutocompleteModule,
    DataViewModule,
    RatingModule,
    TagModule
  ],
  exports: [
    ListProductComponent,
    EditProductComponent
  ]
})
export class ProductScreenModule {
}
