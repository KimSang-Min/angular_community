import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { DataStorageService } from '../store/data-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient,
        private dataStorageService: DataStorageService
    ) { }

    /**********************************
	* user profile 받아오기
	***********************************/
	getUserProfile() {
		return this.http.get('/api/v1/user/profile')
		.pipe(
			tap( 
				(res: any) => {
					this.dataStorageService.updateUserProfile(res);
					return res.message;
				}
			)
		);
	}
}
