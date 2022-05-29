import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinBoardListComponent } from './bulletin-board-list/bulletin-board-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: BulletinBoardListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BulletinBoardRoutingModule { }
