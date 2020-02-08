import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SharedServices } from '../../shared/services/SharedServices';
import { schoolCode } from '../../login/login.component';
import { NgxSpinnerService } from 'ngx-spinner';
export let schoolDataList = [];
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [SharedServices, NgxSpinnerService],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))]),
            routerTransition()]
})
export class DashboardComponent implements OnInit {
    dataSource = new MatTableDataSource<Element>();
    public columnsToDisplay = ['ROLL_NO', 'STUDENT_NAME', 'CLASS','NLE_QUALIFIED'];
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    expandedElement: Element;
    constructor(private service: SharedServices, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.getSchoolResult();
    }
    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getSchoolResult() {
        this.spinner.show();
        const url = 'getSchoolResults?schCode=' + schoolCode;
        this.service.getHttpRequest(url)
          .subscribe(res => {
              this.dataSource.data = res as Element[];
              this.spinner.hide();
          });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

export interface Element {
    SUB2_MARKS: string;
    SUB6: string;
    SUB7: string;
    SUB4: string;
    SCHOOL_CODE: string;
    SUB5: string;
    SUB2: string;
    SUB3: string;
    SUB7_MARKS: string;
    SUB1: string;
    SUB6_RANK: string;
    SUB8: string;
    SUB5_MARKS: string;
    STUDENT_NAME: string;
    SUB2_RANK: string;
    ROLL_NO: string;
    SUB8_RANK: string;
    SUB5_RANK: string;
    CLASS: string;
    SUB7_RANK: string;
    SUB4_RANK: string;
    SUB8_MARKS: string;
    SUB3_MARKS: string;
    STUDENT_ID: string;
    SCHOOL_NAME: string;
    SUB1_MARKS: string;
    SUB1_RANK: string;
    SUB6_MARKS: string;
    SUB3_RANK: string;
    SUB4_MARKS: string;
  }
