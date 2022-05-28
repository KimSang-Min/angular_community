import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SignInGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
        private dialogService: DialogService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const routePath = route.routeConfig.path;
		if (!this.auth.isAuthenticated()) {
			if (routePath == 'welcome' || routePath == 'sign-in' || routePath == 'sign-up' || routePath == 'find-pw') {
				return true;
			} 
			else if(routePath == '' && state.url == '/main'){
                this.dialogService.openDialogNegative('Please login first');
				this.router.navigate(['welcome']);
			}
			else {
				this.dialogService.openDialogNegative('Please login first');
				this.router.navigate(['sign-in'],{queryParams:{'redirectURL':state.url}});
			}
			
			return true;
		} else {
			if (routePath == 'sign-in') {
				this.router.navigate(['main']);
				return true;
			} else if (routePath == 'welcome') {
				this.router.navigate(['main']);
				return true;
			} else if (routePath == 'find-pw') {
				this.router.navigate(['main']);
				return true;
			} else if (routePath == 'sign-up') {
				this.router.navigate(['main']);
				return true;
			} else {
				return true;
			}
		}
    }

}
