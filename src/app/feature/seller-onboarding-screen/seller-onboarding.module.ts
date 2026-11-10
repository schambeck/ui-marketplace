import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SellerOnboardingComponent} from './seller-onboarding.component';
import {SellerAdminComponent} from './seller-admin.component';
import {RouterLink} from "@angular/router";

@NgModule({declarations: [SellerOnboardingComponent, SellerAdminComponent],
    imports: [CommonModule, FormsModule, PanelModule, CardModule, InputTextModule, InputTextareaModule, CheckboxModule, ButtonModule, TableModule, ProgressSpinnerModule, RouterLink], exports: [SellerOnboardingComponent, SellerAdminComponent]})
export class SellerOnboardingModule {}
