import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MenuModule} from "primeng/menu";

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarScreenModule { }
