import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashBoardService {

    constructor(
        private http: HttpClient,
    ) { }


    // 게시글 가져오기
    getMemberData() {
		return this.http.get('/api/v1/admin/adDashBoard/getMemberData');
	}

}
