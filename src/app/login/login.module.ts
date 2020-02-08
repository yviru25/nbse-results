import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
