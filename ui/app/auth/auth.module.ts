import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { AuthGuard } from '../_guards/auth.guard';

import { AuthComponent } from './auth.component';
import { DateInlineComponent } from '../common/date-inline/date-inline.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FirstExpatFormComponent } from './first-expat-form/first-expat-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule,
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: LoginFormComponent },
                    { path: 'register', component: RegisterFormComponent },
                    { path: 'first', component: FirstExpatFormComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    providers: [],
    declarations: [AuthComponent, LoginFormComponent, RegisterFormComponent, DateInlineComponent, FirstExpatFormComponent]
})
export class AuthModule { }
