import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../_guards/auth.guard';

import { DateFilterPipe } from '../_pipes/date.pipe';
import { TruncatePipe } from '../_pipes/truncate.pipe';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { WidgetProfilComponent } from './dashboard/widgets/widget-profil/widget-profil.component';
import { WidgetExpatriationsComponent } from './dashboard/widgets/widget-expatriations/widget-expatriations.component';
import { WidgetActusComponent } from './dashboard/widgets/widget-actus/widget-actus.component';
import { WidgetFavorisComponent } from './dashboard/widgets/widget-favoris/widget-favoris.component';

import { MyexpatComponent } from './myexpat/myexpat.component';
import { ChecklistsComponent } from './myexpat/checklists/checklists.component';
import { ListComponent } from './myexpat/checklists/list/list.component';

import { HappyexpatComponent } from './happyexpat/happyexpat.component';
import { BlogsComponent } from './happyexpat/blogs/blogs.component';
import { AssociationsComponent } from './happyexpat/associations/associations.component';

import { ExpatriationsComponent } from './expatriations/expatriations.component';

import { ProfilComponent } from './profil/profil.component';
import { ProfilMenuComponent } from './profil/profil-menu/profil-menu.component';
import { ProfilDetailsComponent } from './profil/profil-details/profil-details.component';
import { ProfilPasswordComponent } from './profil/profil-password/profil-password.component';

import { FaqComponent } from './faq/faq.component';

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
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                    { path: 'myexpat', component: MyexpatComponent, canActivate: [AuthGuard] },
                    { path: 'happyexpat', component: HappyexpatComponent, canActivate: [AuthGuard] },
                    { path: 'expatriations', component: ExpatriationsComponent, canActivate: [AuthGuard] },
                    {
                        path: 'profil',
                        component: ProfilComponent,
                        canActivate: [AuthGuard],
                        children: [
                            { path: '', redirectTo: 'details', pathMatch: 'full' },
                            { path: 'details', component: ProfilDetailsComponent, canActivate: [AuthGuard] },
                            { path: 'password', component: ProfilPasswordComponent, canActivate: [AuthGuard] }
                        ]
                    },
                    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    declarations: [
        DateFilterPipe, TruncatePipe,
        AppComponent, NavbarComponent, FooterComponent, DashboardComponent,
        WidgetProfilComponent, WidgetExpatriationsComponent, WidgetActusComponent,
        WidgetFavorisComponent,
        MyexpatComponent, ChecklistsComponent, ListComponent,
        HappyexpatComponent, BlogsComponent, AssociationsComponent,
        ExpatriationsComponent,
        ProfilComponent, ProfilMenuComponent, ProfilDetailsComponent, ProfilPasswordComponent,
        FaqComponent
    ]
})
export class AppModule { }
