import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';
import { ProfileService } from 'src/@dw/services/user/profile.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    
    userProfileData;

    constructor(
        private dataStorageService: DataStorageService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        this.dataStorageService.userProfile.subscribe(
            (data: any) => {
                this.userProfileData = data;
            }
        );
    }

    goToHome() {
        this.router.navigate(['main']);
    }


    goToList() {
        this.router.navigate(['bulletin/list']);
    }

}
