import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { SharedServices } from '../shared/services/SharedServices';
import { NgxSpinnerService } from 'ngx-spinner';
export let loggedInDisplayName: string;
export let schoolCode: string;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [SharedServices, NgxSpinnerService],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginModel = new LoginModel();
    public loginResponse = [];
    constructor(
      public router: Router,
      private service: SharedServices,
      private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {}

    onLoggedin(formData) {
        this.spinner.show();
        const url = 'schoolLogin?username=' + this.loginModel.username + '&password=' + this.loginModel.password;
        this.service.getHttpRequest(url)
            .subscribe(res => {
                    this.loginResponse = res;
                    if (this.loginResponse.length > 0) {
                        loggedInDisplayName = res[0].SCH_NAME;
                        schoolCode = res[0].SCH_CODE;
                        localStorage.setItem('loggedIn', JSON.stringify(res));
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/dashboard']);
                        this.spinner.hide();
                    } else {
                        alert('Invalid Credentials');
                        this.spinner.hide();
                    }
        });
    }
}

export class LoginModel {
    role: string;
    username: string;
    password: string;
    rememberMe: boolean;

    get getRole(): string {
        return this.role;
    }
    set setRole(val: string) {
        this.role = val;
    }
}
