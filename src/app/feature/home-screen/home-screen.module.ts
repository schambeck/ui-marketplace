import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PanelModule
  ]
})
export class HomeScreenModule { }
