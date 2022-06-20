import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';
import { SocketioService } from 'src/@dw/services/socketio/socketio.service';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';

@Component({
    selector: 'app-bulletin-board-details',
    templateUrl: './bulletin-board-details.component.html',
    styleUrls: ['./bulletin-board-details.component.scss']
})
export class BulletinBoardDetailsComponent implements OnInit {


    private unsubscribe$ = new Subject<void>();


    public params: any;
    bulletinBoardInfo; // 게시글 상세보기
    uploadImg; 
    userProfileData;
    comments; // 게시글의 댓글 정보
    replyComments; // 게시글 답글 정보

    commentInfo; // 답글 시 부모 댓글 정보
    
    visible_reply=[]; // 답글 버튼 클릭 시 ngClass 위해
    
    commentForm: FormGroup;
    replyCommentForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private bulletinBoardService: BulletinBoardService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private dataStorageService: DataStorageService,
        private router: Router,
    ) { 
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required]],
        });

        this.replyCommentForm = this.formBuilder.group({
            replyComment: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.params = params;
        });

        this.dataStorageService.userProfile.pipe(takeUntil(this.unsubscribe$)).subscribe(
            (res: any) => {
                this.userProfileData = res;
                console.log(this.userProfileData)
            }	
        );
        

        this.getbulletinBoardDetail();
        this.getComment();
    }


    ngOnDestroy() {
        // unsubscribe all subscription
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    
      }


    // 게시글 상세보기
    getbulletinBoardDetail () {

        const data = {
            _id : this.params
        }

        this.bulletinBoardService.getbulletinBoardDetail(data).subscribe((data:any)=> {
            this.bulletinBoardInfo = data;  
            console.log(this.bulletinBoardInfo)
            if(data.fileName) {
                this.uploadImg = `http://localhost:3300/uploads/bulletinBoardFile/${data.fileName}`
            }
            
        })
    }


    // 게시글 추천
    recommendation() {

        const data = {
            _id : this.params
        }

        this.dialogService.openDialogConfirm(`추천하시겠습니까?`).subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.recommendation(data).subscribe((data)=> {
                    this.getbulletinBoardDetail();
                })
            }
        })
    }

    // 게시글 반대
    opposite() {
        const data = {
            _id : this.params
        }

        this.dialogService.openDialogConfirm(`반대하시겠습니까?`).subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.opposite(data).subscribe((data)=> {
                    this.getbulletinBoardDetail();
                })
            }
        })
    }

    // 댓글 가져오기
    getComment() {

        const data = {
            _id : this.params
        }

        this.bulletinBoardService.getComment(data).subscribe((data)=> {
            this.comments = data;

            console.log(this.comments)
        })
    }



    // 댓글 등록
    saveComment() {

        const data = {
            bulletinBoard_id: this.params._id,
            writer_id: this.userProfileData._id,
            writer_name: this.userProfileData.name,
            comment: this.commentForm.value.comment
        }

        this.dialogService.openDialogConfirm('등록하시겠습니까?').subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.saveComment(data).subscribe((data)=> {
                    this.commentForm.reset();

                    this.getComment();
                })
            }
        })
        
    }

    // 답글 생성
    createReply(index) {

        for(let i=0; i < this.comments.length; i++) {
            this.visible_reply.push(i)
            this.visible_reply[i] = false;
        }
        
        this.visible_reply[index] = true;
    }


    // 답글 작성
    saveReplyComment(commentInfo) {

        const createdAt = new Date()

        // 부모 댓글 _id, 답글 작성자 정보, 답글 content
        const data = {
            bulletinBoard_id: this.params._id, // 게시글 _id
            comment_id: commentInfo._id, // 댓글 _id
            writer_id: this.userProfileData._id, // 작성자 _id
            writer_name: this.userProfileData.name, // 작성자 이름
            replyComment: this.replyCommentForm.value.replyComment, // 작성 내용
            createdAt: createdAt
        }

        this.bulletinBoardService.saveReplyComment(data).subscribe((data:any)=> {
            if(data.message == 'Success saved reply comment') {
                this.getComment();
                this.replyCommentForm.reset();
            }
        })
    }

    // 댓글 삭제
    deleteCommentBtn(_id) {
        this.dialogService.openDialogConfirm('댓글을 삭제하시겠습니까?').subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.deleteCommentBtn({_id}).subscribe((data)=> {
                    this.getComment();
                })
            }
        })
        
    }

    // 답글 삭제
    deleteReplyCommentBtn(replyCommentInfo) {
        this.dialogService.openDialogConfirm('답글을 삭제하시겠습니까?').subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.deleteReplyCommentBtn(replyCommentInfo).subscribe((data)=> {
                    this.getComment();
                })
            }
        })
        
    }


    // 게시글 삭제
    bulletinBoardDelete() {

        const _id = this.params._id;

        this.dialogService.openDialogConfirm('게시글을 삭제하시겠습니까?').subscribe((result)=> {
            if(result) {
                this.bulletinBoardService.deleteBoard({_id}).subscribe((data: any)=> {
                    if(data.message == 'Success delete board') {
                        this.dialogService.openDialogPositive('삭제되었습니다.');
                        this.router.navigate(['bulletin/list']);
                    }
                })
            }
        })
        
    }
}
