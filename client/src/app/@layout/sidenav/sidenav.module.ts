import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgMaterialUIModule } from 'src/app/ng-material-ui/ng-material-ui.module';
import { SidenavComponent } from './sidenav.component';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    NgMaterialUIModule,
    RouterModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
