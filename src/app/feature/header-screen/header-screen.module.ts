import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {SidebarScreenModule} from "../sidebar-screen/sidebar-screen.module";
import {LoggedUserComponent} from "./logged-user/logged-user.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ImageModule} from "primeng/image";

@NgModule({
  declarations: [
    HeaderComponent,
    LoggedUserComponent,
    ShoppingCartComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MenubarModule,
    ToolbarModule,
    ButtonModule,
    MenuModule,
    SidebarModule,
    SidebarScreenModule,
    BadgeModule,
    ProgressSpinnerModule,
    TooltipModule,
    NgOptimizedImage,
    ImageModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderScreenModule { }
