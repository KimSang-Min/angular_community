import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';

@Component({
    selector: 'app-bulletin-board-upload',
    templateUrl: './bulletin-board-upload.component.html',
    styleUrls: ['./bulletin-board-upload.component.scss']
})
export class BulletinBoardUploadComponent implements OnInit {

    constructor(
        private _ngZone: NgZone
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }

    ngOnInit(): void {
    }


    
}
