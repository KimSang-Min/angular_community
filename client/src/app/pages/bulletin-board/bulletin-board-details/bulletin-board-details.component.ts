import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    bulletinBoardInfo;
    uploadImg;
    userProfileData;
    comments;

    commentForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private bulletinBoardService: BulletinBoardService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private dataStorageService: DataStorageService,
    ) { 
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.params = params;
        });

        this.dataStorageService.userProfile.pipe(takeUntil(this.unsubscribe$)).subscribe(
            (res: any) => {
                this.userProfileData = res;
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
        })
    }



    // 댓글 등록
    saveComment() {
        console.log(this.commentForm.value)

        console.log(this.userProfileData)
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
}
