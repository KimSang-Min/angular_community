import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
    ) { }


    // 회원가입
    signUp(userData) {
		return this.http.post('/api/v1/auth/signUp', userData);
	}

}
