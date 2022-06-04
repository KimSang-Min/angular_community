import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BulletinBoardRoutingModule { }
