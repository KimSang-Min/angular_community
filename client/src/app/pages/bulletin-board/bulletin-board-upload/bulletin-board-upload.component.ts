
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';

@Component({
    selector: 'app-bulletin-board-upload',
    templateUrl: './bulletin-board-upload.component.html',
    styleUrls: ['./bulletin-board-upload.component.scss']
})
export class BulletinBoardUploadComponent implements OnInit {

    public fileData: File;
    boardName: string;
    uploadForm: FormGroup;
    userProfileData;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private bulletinBoardService: BulletinBoardService,
        private dialogService: DialogService,
        private dataStorageService: DataStorageService,
    ) {
        this.uploadForm = this.formBuilder.group({
            title: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required]),
            upload_file: ['', Validators.required],
        });
    }

    // 폼 필드에 쉽게 접근하기 위해 getter 설정
    get f() { return this.uploadForm.controls; }


    ngOnInit(): void {
    }

    onSubmit(data) {
        console.log(data)

        if (data.title == '' && data.content == '') {
            this.dialogService.openDialogNegative('제목과 내용을 입력해주세요.')
        } else {
            this.uploadBulletinBoard(data);
        }

    }


    uploadBulletinBoard(data) {
        console.log(data)
        // FromData()를 사용해줘야 append 사용 가능하다
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('upload_file', this.uploadForm.get('upload_file').value);


        this.dialogService.openDialogConfirm('등록하시겠습니까?').subscribe((result) => {
            if (result) {
                this.bulletinBoardService.uploadBulletinBoard(formData).subscribe((data: any) => {
                    if (data.message == 'success upload') {
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
            console.log(fileData);

            this.uploadForm.get('upload_file').setValue(this.fileData);
        }
    }


}

