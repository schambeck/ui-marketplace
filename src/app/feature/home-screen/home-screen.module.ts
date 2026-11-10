import {QuickActionsComponent} from './dashboard/quick-actions.component';
import {RouterModule} from '@angular/router';
import {UiModule} from '../../shared/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {KpiCardComponent} from './dashboard/kpi-card.component';
import {OfferChartComponent} from './dashboard/offer-chart.component';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    HomeComponent, KpiCardComponent, OfferChartComponent, QuickActionsComponent
  ],
  imports: [
    UiModule, RouterModule,
    CommonModule,
    PanelModule
  ]
})
export class HomeScreenModule { }
