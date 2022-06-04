import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinBoardRoutingModule } from './bulletin-board-routing.module';
import { NgMaterialUIModule } from 'src/app/ng-material-ui/ng-material-ui.module';
import { BulletinBoardListComponent } from './bulletin-board-list/bulletin-board-list.component';
import { BulletinBoardUploadComponent } from './bulletin-board-upload/bulletin-board-upload.component';
import { BulletinBoardDetailsComponent } from './bulletin-board-details/bulletin-board-details.component';


@NgModule({
  declarations: [
    BulletinBoardListComponent,
    BulletinBoardUploadComponent,
    BulletinBoardDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgMaterialUIModule,
    BulletinBoardRoutingModule,
  ]
})
export class BulletinBoardModule { }
