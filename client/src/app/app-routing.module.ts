import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInGuard } from 'src/@dw/guard/sign-in.guard';
import { CommunityComponent } from './@layout/community.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { IndexComponent } from './pages/index/index.component';



const routes: Routes = [
    { 
        path: 'welcome',
        component: IndexComponent,
        canActivate: [SignInGuard] 
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        loadChildren: () =>
            import(`./pages/auth/auth.module`).then(m => m.AuthModule),
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        loadChildren: () =>
            import(`./pages/auth/auth.module`).then(m => m.AuthModule),
    },
    {
        path: 'find-pw',
        loadChildren: () =>
            import(`./pages/auth/auth.module`).then(m => m.AuthModule),
    },
    {
		path: '',
		component: CommunityComponent,
		canActivate: [SignInGuard],
        children: [
			{
				path: 'main',
				loadChildren: () => import(`./pages/main/main.module`).then(m => m.MainModule),
			},
            {
				path: 'bulletin',
				loadChildren: () => import(`./pages/bulletin-board/bulletin-board.module`).then(m => m.BulletinBoardModule),
			},
            {
                path: '',
                redirectTo: 'main',
                pathMatch: 'full'
            },
        ]
    },
    // 잘못된 URL을 사용했을때 메인으로 보냄
    {
        path: '**',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
