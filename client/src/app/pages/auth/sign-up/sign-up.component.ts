import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/@dw/dialog/dialog.service';
import { AuthService } from 'src/@dw/services/auth/auth.service';

interface FormData {
    email: string;
    password: string;
    confirmedPassword: string;
    name: string;
}

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


    form: FormGroup;
    pwdMatchFlag: boolean;

    signUpFormData: FormData = {
        email: '',
        password: '',
        confirmedPassword: '',
        name: ''
    }

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
    ) {
        this.form = this.formBuilder.group(
            {
                email: ['', [
                    Validators.required,
                    Validators.email
                ]],
                password: ['', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.minLength(15)
                ]],
                confirmedPassword: ['', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.minLength(15)
                ]],
                name: ['', [
                    Validators.required,
                ]],
            },
        );
    }

    ngOnInit(): void {
        this.pwdMatchFlag = false;
    }


    signUp() {
        this.authService.signUp(this.signUpFormData).subscribe((data: any) => {

            this.dialogService.openDialogConfirm(`Are you sure you want to sign up?`).subscribe((result) => {
                if (result) {
                    if (data.message == 'created') {
                        this.dialogService.openDialogPositive(`Created !`);
                        this.router.navigate(['']);
                    }

                    if (data.message == 'duplicated') {
                        this.dialogService.openDialogNegative(`Email duplicated!`);
                    }
                }
            })
        })
    }

}
