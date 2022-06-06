import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';

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
    ) { }

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
            
            console.log(data.fileName)
            this.uploadImg = `http://localhost:3300/uploads/bulletinBoardFile/${data.fileName}`
        })
    }

}
