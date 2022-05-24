import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialUIModule } from '../ng-material-ui/ng-material-ui.module';
import { ToolbarModule } from '../@layout/toolbar/toolbar.module';



@NgModule({
    declarations: [],
    imports: [
        ToolbarModule,
        CommonModule,
        NgMaterialUIModule
    ]
})
export class CommunityModule { }
