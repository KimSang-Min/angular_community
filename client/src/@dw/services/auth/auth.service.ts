import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, shareReplay, tap } from 'rxjs';
import { ENV } from 'src/@dw/config/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
    ) { }


    // 회원가입
    signUp(data) {
		return this.http.post('/api/v1/auth/signUp', data);
	}

    // 로그인
    signIn(userData): Observable<Token> {
		return this.http.post<Token>('/api/v1/auth/signIn', userData)
		.pipe(
			shareReplay(),
			tap( 
			(res:any) => {
						this.setToken(res.token)
					}),
					shareReplay()
	    )
    }


    logOut(): void {
		this.removeToken();
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		return token ? !this.isTokenExpired(token) : false;
	}

  	getToken(): string {
		return localStorage.getItem(ENV.tokenName);
	}

	setToken(token: string): void {
		localStorage.setItem(ENV.tokenName, token);
	}

	removeToken(): void {
		localStorage.removeItem(ENV.tokenName);
	}

	// jwtHelper
	isTokenExpired(token: string) {
		return this.jwtHelper.isTokenExpired(token);
	}

	getTokenInfo() {
		return this.jwtHelper.decodeToken(this.getToken());
	}

}
