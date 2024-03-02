import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkeletonModule} from 'primeng/skeleton';
import {AccordionModule} from 'primeng/accordion';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarModule} from "primeng/toolbar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {UserAutocompleteComponent} from "./user-autocomplete/user-autocomplete.component";
import {ProductAutocompleteComponent} from "./product-autocomplete/product-autocomplete.component";

@NgModule({
  declarations: [UserAutocompleteComponent, ProductAutocompleteComponent],
  exports: [UserAutocompleteComponent, ProductAutocompleteComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PanelModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    CardModule,
    SkeletonModule,
    AccordionModule,
    TooltipModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ToolbarModule,
    AutoCompleteModule
  ]
})
export class CustomAutocompleteModule {
}
