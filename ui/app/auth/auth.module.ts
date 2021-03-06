import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../_guards/auth.guard';

import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FirstExpatFormComponent } from './first-expat-form/first-expat-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: LoginFormComponent },
                    { path: 'register', component: RegisterFormComponent },
                    { path: 'reset_password', component: ResetPasswordComponent },
                    { path: 'reset_password/:token', component: ResetPasswordComponent },
                    { path: 'first', component: FirstExpatFormComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    providers: [],
    declarations: [AuthComponent, LoginFormComponent, RegisterFormComponent, ResetPasswordComponent, FirstExpatFormComponent]
})
export class AuthModule { }
