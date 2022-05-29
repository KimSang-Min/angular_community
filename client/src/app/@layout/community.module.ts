import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialUIModule } from '../ng-material-ui/ng-material-ui.module';
import { ToolbarModule } from '../@layout/toolbar/toolbar.module';
import { SidenavModule } from './sidenav/sidenav.module';



@NgModule({
    declarations: [],
    imports: [
        SidenavModule,
        ToolbarModule,
        CommonModule,
        NgMaterialUIModule
    ]
})
export class CommunityModule { }
