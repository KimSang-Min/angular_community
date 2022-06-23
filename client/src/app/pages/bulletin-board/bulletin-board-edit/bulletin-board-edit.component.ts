import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';

@Component({
    selector: 'app-bulletin-board-edit',
    templateUrl: './bulletin-board-edit.component.html',
    styleUrls: ['./bulletin-board-edit.component.scss']
})
export class BulletinBoardEditComponent implements OnInit {

    private unsubscribe$ = new Subject<void>();

    public params: any;
    bulletinBoardInfo; // 게시글 상세보기
    userProfileData;

    public fileData: File;
    uploadForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private dataStorageService: DataStorageService,
        private bulletinBoardService: BulletinBoardService,
        private dialogService: DialogService,
    ) {
        this.uploadForm = this.formBuilder.group({
            title: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required]),
            upload_file: ['', Validators.required],
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
    }


    ngOnDestroy() {
        // unsubscribe all subscription
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    
    }


    // 게시글 정보 가져오기
    getbulletinBoardDetail () {

        const data = {
            _id : this.params
        }

        this.bulletinBoardService.getbulletinBoardDetail(data).subscribe((data:any)=> {
            this.bulletinBoardInfo = data;  
            console.log(this.bulletinBoardInfo)
            
            
        })
    }



    onSubmit(data) {
        console.log(data)

        if (data.title == '' && data.content == '') {
            this.dialogService.openDialogNegative('제목과 내용을 입력해주세요.')
        } else {
            this.editBulletinBoard(data);
        }
    }


    editBulletinBoard(data) {
        // FromData()를 사용해줘야 append 사용 가능하다
        const formData = new FormData();
        formData.append('_id', this.params._id);
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('upload_file', this.uploadForm.get('upload_file').value);


        this.dialogService.openDialogConfirm('등록하시겠습니까?').subscribe((result) => {
            if (result) {
                this.bulletinBoardService.editBulletinBoard(formData).subscribe((data: any) => {
                    if (data.message == 'success edit') {
                        this.router.navigate(['bulletin/list']);
                    }
                })
            }
        })
    }


    // 파일 업로드
    onFileChange(fileData: any) {
        if (fileData.target.files.length > 0) {
            this.fileData = fileData.target.files[0];

            this.uploadForm.get('upload_file').setValue(this.fileData);
        }
    }

    cancelBtn() {
        this.router.navigate(['bulletin/list']);
    }
}
