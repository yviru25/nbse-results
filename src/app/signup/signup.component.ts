import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { SharedServices } from '../shared/services/SharedServices';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [SharedServices, NgxSpinnerService],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public model = new RollNoModel();
    public resultList = [];
    public subjectArray = [];
    public studentInfo = [];
    public studentSubList = [];
    public error: Boolean = false;
    public showStudentInfo: Boolean = false;
    constructor(private service: SharedServices, private spinner: NgxSpinnerService) {

    }

    ngOnInit() {

    }

    getStudentResult(formdata): void {
        this.spinner.show();
        const url = 'getStudentResultByRollNo?stuRollNo=' + this.model.rollNo + '&schoolCode=' + this.model.schoolCode;
        this.service.getHttpRequest(url)
            .subscribe(res => {
                this.resultList = res;
                this.spinner.hide();
                if (this.resultList['studentInfo'].length > 0) {
                    this.showStudentInfo = true;
                    this.error = false;
                    this.studentInfo = this.resultList['studentInfo'];
                    this.studentSubList = this.resultList['subjects'];
                } else {
                    this.error = true;
                    this.showStudentInfo = false;
                }
               /*  this.subjectArray = [];
                this.spinner.hide();
                if (this.resultList.length > 0) {
                    for (let i = 1; i <= 8; i++) {
                        this.error = false;
                        const json = {
                            subjectName: this.resultList[0]["SUB" + i],
                            subjectMarks: this.resultList[0]["SUB" + i + "_MARKS"],
                            rank: this.resultList[0]["SUB" + i + "_RANK"]
                        };
                        if (this.resultList[0]["SUB" + i] !== undefined && this.resultList[0]["SUB" + i] !== "") {
                            this.subjectArray.push(json);
                        }
                    }
                } else {
                    this.error = true;
                } */
            });
    }

}

export class RollNoModel {
    rollNo: string;
    schoolCode: string;
}
