import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../_guards/auth.guard';

import { DateFilterPipe } from '../_pipes/date.pipe';
import { ReversePipe } from '../_pipes/reverse.pipe';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { WidgetProfilComponent } from './dashboard/widgets/widget-profil/widget-profil.component';
import { WidgetExpatriationsComponent } from './dashboard/widgets/widget-expatriations/widget-expatriations.component';
import { WidgetActusComponent } from './dashboard/widgets/widget-actus/widget-actus.component';
import { WidgetFavorisComponent } from './dashboard/widgets/widget-favoris/widget-favoris.component';

import { MyneedsComponent } from './myneeds/myneeds.component';
import { ChecklistsComponent } from './myneeds/checklists/checklists.component';
import { ListComponent } from './myneeds/checklists/list/list.component';

import { HappyexpatComponent } from './happyexpat/happyexpat.component';
import { HappyexpatTabsComponent } from './happyexpat/happyexpat-tabs/happyexpat-tabs.component';
import { BlogsComponent } from './happyexpat/blogs/blogs.component';
import { BlogDetailComponent } from './happyexpat/blogs/blog-detail/blog-detail.component';
import { AssociationsComponent } from './happyexpat/associations/associations.component';
import { AssociationDetailComponent } from './happyexpat/associations/association-detail/association-detail.component';

import { ExpatriationsComponent } from './expatriations/expatriations.component';

import { ProfilComponent } from './profil/profil.component';
import { ProfilMenuComponent } from './profil/profil-menu/profil-menu.component';
import { ProfilDetailsComponent } from './profil/profil-details/profil-details.component';
import { ProfilPasswordComponent } from './profil/profil-password/profil-password.component';

import { FaqComponent } from './faq/faq.component';
import { LegalComponent } from './legal/legal.component';
import { JobsComponent } from './myneeds/jobs/jobs.component';

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
                    { path: 'myneeds', component: MyneedsComponent, canActivate: [AuthGuard] },
                    { path: 'happyexpat', component: HappyexpatComponent, canActivate: [AuthGuard],
                        children: [
                            { path: '', component: HappyexpatTabsComponent, canActivate: [AuthGuard] },
                            { path: 'blog/detail/:id', component: BlogDetailComponent, canActivate: [AuthGuard] },
                            { path: 'association/detail/:id', component: AssociationDetailComponent, canActivate: [AuthGuard] }
                        ]},
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
                    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
                    { path: 'mentions', component: LegalComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    declarations: [
        DateFilterPipe, ReversePipe,
        AppComponent, NavbarComponent, FooterComponent, DashboardComponent,
        WidgetProfilComponent, WidgetExpatriationsComponent, WidgetActusComponent,
        WidgetFavorisComponent,
        MyneedsComponent, ChecklistsComponent, ListComponent,
        HappyexpatTabsComponent, HappyexpatComponent, BlogsComponent, BlogDetailComponent,
        AssociationsComponent, AssociationDetailComponent,
        ExpatriationsComponent,
        ProfilComponent, ProfilMenuComponent, ProfilDetailsComponent, ProfilPasswordComponent,
        FaqComponent,
        LegalComponent,
        JobsComponent
    ]
})
export class AppModule { }
