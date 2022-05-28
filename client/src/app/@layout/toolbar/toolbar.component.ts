import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { AuthService } from 'src/@dw/services/auth/auth.service';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';
import { ProfileService } from 'src/@dw/services/user/profile.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    userProfileData



    private unsubscribe$ = new Subject<void>();

    constructor(
        private router: Router,
        private profileService: ProfileService,
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {

        this.profileService.getUserProfile().subscribe((data:any)=> {
            console.log(data)
        })

        this.getUserProfileData();

    }

    ngOnDestroy() {
        // unsubscribe all subscription
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    getUserProfileData() {
        this.dataStorageService.userProfile.pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
            this.userProfileData = res;
        });
    }

    logOut() {
        this.dialogService.openDialogConfirm('Are you sure you want to log out?').subscribe((result)=>{
            if(result) {
                this.authService.logOut();
                this.router.navigate(['welcome']);
            }
        })
       
    }

}
