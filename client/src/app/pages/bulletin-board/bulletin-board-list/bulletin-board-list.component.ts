import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { DataStorageService } from 'src/@dw/services/store/data-storage.service';
import * as moment from 'moment';
import { CommonService } from 'src/@dw/services/common/common.service';
import { BulletinBoardService } from 'src/@dw/services/bulletin-board/bulletin-board.service';
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
    index: number;
    title: string;
    writer: string;
    date: string;
    numberOfViews: number;
    recommendation: number;
}

export interface Employees {
    _id: string;
    name: string;
    email: string;
}



@Component({
    selector: 'app-bulletin-board-list',
    templateUrl: './bulletin-board-list.component.html',
    styleUrls: ['./bulletin-board-list.component.scss']
})
export class BulletinBoardListComponent implements OnInit {

    userInfo;

    contractList = new MatTableDataSource;

    private unsubscribe$ = new Subject<void>();

    // auto complete
    myControl = new FormControl();
    options: Employees[];
    filteredOptions: Observable<Employees[]>;

    // view table
    displayedColumns: string[] = ['index', 'title', 'writer', 'date', 'numberOfViews', 'recommendation'];
    dataSource

    // contractForm: FormGroup


    searchStr = '';

    viewType = {
        'pending': 'Pending',
        'proceeding': 'Proceeding',
        'complete': 'Complete',
        'reject': 'Reject',
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private bulletinBoardService: BulletinBoardService,
        public dataStorageService: DataStorageService,
        private snackbar: MatSnackBar,
        
    ) { }

    ngOnInit(): void {

        const startOfMonth = moment().startOf('month').format();
        const endOfMonth = moment().endOf('month').format();

        // this.contractForm = this.formBuilder.group({
        //     status: ['all', [
        //         Validators.required,
        //     ]],
        //     start_date: [startOfMonth, [
        //         Validators.required,
        //     ]],
        //     end_date: [endOfMonth, [
        //         Validators.required,
        //     ]]
        // });

       
        this.getbulletinBoardList();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    uploadRouting() {
        this.router.navigate(['/bulletin/upload']);
    }


    // 게시글 가져오기
    getbulletinBoardList() {

        this.bulletinBoardService.getbulletinBoardList().subscribe((data:any)=> {
            this.contractList = new MatTableDataSource<PeriodicElement>(data);
            this.contractList.paginator = this.paginator;
            this.contractList.sort = this.sort
        })
    }


    // Go to the page where you sign a contract
    openBulletinBoardDetail(data) {
        this.router.navigate([`/bulletin/detail/${data._id}`]);
    }



    

}