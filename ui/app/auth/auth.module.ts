import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    { path: 'login', component: LoginFormComponent },
                    { path: 'register', component: RegisterFormComponent }
                ]
            }
        ])
    ],
    declarations: [AuthComponent, LoginFormComponent, RegisterFormComponent]
})
export class AuthModule { }
