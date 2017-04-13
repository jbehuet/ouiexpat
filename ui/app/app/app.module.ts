import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../_guards/auth.guard';

import { DateFilterPipe } from '../_pipes/date.pipe';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import { WidgetProfilComponent } from './dashboard/widgets/widget-profil/widget-profil.component';
import { WidgetExpatriationsComponent } from './dashboard/widgets/widget-expatriations/widget-expatriations.component';
import { WidgetActusComponent } from './dashboard/widgets/widget-actus/widget-actus.component';
import { WidgetFavorisComponent } from './dashboard/widgets/widget-favoris/widget-favoris.component';

import { ExpatriationsComponent } from './expatriations/expatriations.component';

import { ProfilComponent } from './profil/profil.component';
import { ProfilMenuComponent } from './profil/profil-menu/profil-menu.component';
import { ProfilDetailsComponent } from './profil/profil-details/profil-details.component';

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
                    { path: 'expatriations', component: ExpatriationsComponent },
                    {
                        path: 'profil',
                        component: ProfilComponent,
                        children: [
                            { path: '', redirectTo: 'details', pathMatch: 'full' },
                            { path: 'details', component: ProfilDetailsComponent }
                        ]
                    }
                ]
            }
        ])
    ],
    declarations: [
        DateFilterPipe,
        AppComponent, DashboardComponent, NavbarComponent, WidgetProfilComponent,
        WidgetExpatriationsComponent, WidgetActusComponent, WidgetFavorisComponent,
        ExpatriationsComponent,
        ProfilComponent, ProfilMenuComponent, ProfilDetailsComponent
    ]
})
export class AppModule { }
