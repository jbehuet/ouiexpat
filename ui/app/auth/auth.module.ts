import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    { path: 'login', component: LoginFormComponent }
                ]
            }
        ])
    ],
    declarations: [AuthComponent, LoginFormComponent]
})
export class AuthModule { }
