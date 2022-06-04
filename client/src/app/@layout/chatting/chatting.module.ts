import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialUIModule } from 'src/app/ng-material-ui/ng-material-ui.module';
import { RouterModule } from '@angular/router';
import { ChattingComponent } from './chatting.component';



@NgModule({
  declarations: [ChattingComponent],
  imports: [
    CommonModule,
    NgMaterialUIModule,
    RouterModule
  ],
  exports: [ChattingComponent]
})
export class ChattingModule { }
