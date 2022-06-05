import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BulletinBoardService {

    constructor(
        private http: HttpClient,
    ) { }


    // 게시글 가져오기
    getbulletinBoardList() {
		return this.http.get('/api/v1/bulletinBoard/getbulletinBoardList');
	}


    // 게시글 업로드
    uploadBulletinBoard(data) {
		return this.http.post('/api/v1/bulletinBoard/upload', data);
	}
}
