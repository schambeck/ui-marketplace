import {RouterModule} from '@angular/router';
import {UiModule} from '../../shared/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    UiModule, RouterModule,
    CommonModule,
    PanelModule
  ]
})
export class HomeScreenModule { }
