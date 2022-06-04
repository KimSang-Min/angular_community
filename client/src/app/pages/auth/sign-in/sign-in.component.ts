import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { AuthService } from 'src/@dw/services/auth/auth.service';


interface FormData {
    email: string;
    password: string;
}


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    params: any;

    form: FormGroup;

    signInFormData: FormData = {
        email: '',
        password: '',
    };

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        private route: ActivatedRoute,
    ) { 
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.minLength(15)]],
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.params = params;
        });
    }


    signIn() {
        console.log(this.signInFormData);
        this.authService.signIn(this.signInFormData).subscribe(
            (data: any) => {
                if(this.params.redirectURL != '' && this.params.redirectURL != null && data.token != '' && data.token != null ){
                    this.router.navigate([`${this.params.redirectURL}`]);
                }
                else if(data.token != '' && data.token != null) {
                    this.router.navigate(['main']);
                }        
            },
            err => {
                // console.log(err.error);
				this.errorAlert(err.error.message);
            },
        );
    }


    errorAlert(err) {
		switch(err) {
			case 'not found':
				this.dialogService.openDialogNegative(' 아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.                입력하신 내용을 다시 확인해주세요. ');
				break;
		}
	};
}
