import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private userProfileSubject = new BehaviorSubject({});
	userProfile = this.userProfileSubject.asObservable();


	constructor() {}

    
	updateUserProfile(profileData: any) {
		// console.log('updatedData', profileData);
		this.userProfileSubject.next(profileData);
	}
}
