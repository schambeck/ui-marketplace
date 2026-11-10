import {UiModule} from '../../shared/ui/ui.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {ListUserComponent} from './list-user/list-user.component';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkeletonModule} from 'primeng/skeleton';
import {AccordionModule} from 'primeng/accordion';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {EditUserComponent} from './edit-user/edit-user.component';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarModule} from "primeng/toolbar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CustomAutocompleteModule} from "../custom-autocomplete-component/custom-autocomplete.module";
import {CalendarModule} from "primeng/calendar";
import {ViewLoggedUserComponent} from "./view-logged-user/view-logged-user.component";

@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent,
    ViewLoggedUserComponent
  ],
  imports: [
    UiModule,
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
    CustomAutocompleteModule
  ],
  exports: [
    ListUserComponent,
    EditUserComponent,
    ViewLoggedUserComponent
  ]
})
export class UserScreenModule {
}
