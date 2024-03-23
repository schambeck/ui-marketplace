import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ImageModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileScreenModule { }
