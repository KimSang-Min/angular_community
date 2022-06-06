import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinBoardDetailsComponent } from './bulletin-board-details/bulletin-board-details.component';
import { BulletinBoardListComponent } from './bulletin-board-list/bulletin-board-list.component';
import { BulletinBoardUploadComponent } from './bulletin-board-upload/bulletin-board-upload.component';

const routes: Routes = [
    {
        path: 'list',
        component: BulletinBoardListComponent
    },
    {
        path: 'upload',
        component: BulletinBoardUploadComponent
    },
    {
        path: 'detail/:_id',
        component: BulletinBoardDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BulletinBoardRoutingModule { }
