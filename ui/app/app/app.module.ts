import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../_guards/auth.guard';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { WidgetProfilComponent } from './dashboard/widgets/widget-profil/widget-profil.component';
import { WidgetExpatriationsComponent } from './dashboard/widgets/widget-expatriations/widget-expatriations.component';
import { WidgetActusComponent } from './dashboard/widgets/widget-actus/widget-actus.component';
import { WidgetFavorisComponent } from './dashboard/widgets/widget-favoris/widget-favoris.component';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterializeModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'profil', component: ProfilComponent }
                ]
            }
        ])
    ],
    declarations: [
        AppComponent, DashboardComponent, NavbarComponent, WidgetProfilComponent,
        WidgetExpatriationsComponent, WidgetActusComponent, WidgetFavorisComponent,
        ProfilComponent
    ]
})
export class AppModule { }
