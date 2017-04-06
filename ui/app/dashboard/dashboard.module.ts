import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AuthGuard } from '../_guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WidgetProfilComponent } from './widgets/widget-profil/widget-profil.component';
import { WidgetExpatriationsComponent } from './widgets/widget-expatriations/widget-expatriations.component';

@NgModule({
    imports: [
        CommonModule,
        MaterializeModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    declarations: [DashboardComponent, NavbarComponent, WidgetProfilComponent, WidgetExpatriationsComponent]
})
export class DashboardModule { }
