import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/@dw/services/dashBoard/dashBoard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



    constructor(
        private dashBoardService: DashBoardService
    ) { }

    ngOnInit(): void {
        this.getMemberData();
    }


    // 멤버 정보 가져오기
    getMemberData() {
        this.dashBoardService.getMemberData().subscribe((data)=> {

        })
    }

}
