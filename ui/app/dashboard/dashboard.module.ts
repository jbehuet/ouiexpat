import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
