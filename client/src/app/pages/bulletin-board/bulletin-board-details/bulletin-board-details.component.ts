import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';
import { SocketioService } from 'src/@dw/services/socketio/socketio.service';

@Component({
    selector: 'app-bulletin-board-details',
    templateUrl: './bulletin-board-details.component.html',
    styleUrls: ['./bulletin-board-details.component.scss']
})
export class BulletinBoardDetailsComponent implements OnInit {

    public params: any;
    bulletinBoardInfo;
    uploadImg;

    constructor(
        private route: ActivatedRoute,
        private bulletinBoardService: BulletinBoardService,
        private dialogService: DialogService,
    ) { 
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.params = params;
        });

        this.getbulletinBoardDetail();
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
}
