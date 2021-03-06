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

    // 게시글 디테일
    getbulletinBoardDetail(data) {
        return this.http.get('/api/v1/bulletinBoard/getbulletinBoardDetail', {params: data._id});
    }

    // 게시글 추천
    recommendation(data) {
        return this.http.post('/api/v1/bulletinBoard/recommendation', data._id);
    }

    // 게시글 반대
    opposite(data) {
        return this.http.post('/api/v1/bulletinBoard/opposite', data._id);
    }

    // 댓글 가져오기
    getComment(data) {
        return this.http.get('/api/v1/bulletinBoardComment/getBulletinBoardComment', {params: data._id});
    }

    // 댓글 작성
    saveComment(data) {
        return this.http.post('/api/v1/bulletinBoardComment/saveBulletinBoardComment', data);
    }

    // 답글 작성
    saveReplyComment(data) {
        return this.http.post('/api/v1/bulletinBoardComment/saveBulletinBoardReplyComment', data);
    }

    // 댓글 삭제
    deleteCommentBtn(_id) {
        return this.http.delete('/api/v1/bulletinBoardComment/deleteBulletinBoardComment', {params: _id});
    }

    // 답글 삭제
    deleteReplyCommentBtn(replyCommentInfo) {
        return this.http.delete('/api/v1/bulletinBoardComment/deleteBulletinBoardReplyComment' , {params: replyCommentInfo} );
    }
    // 게시글 삭제
    deleteBoard(_id) {
        return this.http.delete('/api/v1/bulletinBoard/deleteBoard' , {params: _id});
    }

    // 게시글 수정
    editBulletinBoard(data) {
		return this.http.post('/api/v1/bulletinBoard/edit', data);
	}
}
