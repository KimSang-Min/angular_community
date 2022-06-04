import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgMaterialUIModule } from 'src/app/ng-material-ui/ng-material-ui.module';
import { ChattingComponent } from '../../@layout/chatting/chatting.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgMaterialUIModule,
  ]
})
export class MainModule { }
