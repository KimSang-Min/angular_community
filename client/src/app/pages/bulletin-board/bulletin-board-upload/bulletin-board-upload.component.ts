
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
    selector: 'app-bulletin-board-upload',
    templateUrl: './bulletin-board-upload.component.html',
    styleUrls: ['./bulletin-board-upload.component.scss']
})
export class BulletinBoardUploadComponent implements OnInit {

    boardName: string;
    uploadForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.uploadForm = this.formBuilder.group({
            title: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required])
        });
        // this.boardName = this.route.snapshot.params['boardName'];
    }

    // 폼 필드에 쉽게 접근하기 위해 getter 설정
    get f() { return this.uploadForm.controls; }

    



    ngOnInit(): void {
    }


    save() {
        console.log(this.uploadForm.value)
    }


}

