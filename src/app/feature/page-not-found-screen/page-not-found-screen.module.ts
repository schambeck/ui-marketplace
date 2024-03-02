import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PanelModule} from "primeng/panel";

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundScreenModule {
}
