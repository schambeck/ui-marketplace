import {UiModule} from '../../shared/ui/ui.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {CalendarModule} from 'primeng/calendar';
import {TagModule} from 'primeng/tag';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmationService} from 'primeng/api';

import {ListGameContextComponent} from './list-game-context/list-game-context.component';
import {EditGameContextComponent} from './edit-game-context/edit-game-context.component';

@NgModule({
  declarations: [
    ListGameContextComponent,
    EditGameContextComponent
  ],
  imports: [
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    CalendarModule,
    TagModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers: [ConfirmationService],
  exports: [ListGameContextComponent, EditGameContextComponent]
})
export class GameContextScreenModule {
}
