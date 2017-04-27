import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from '../shared/shared.module';

import { AdminGuard } from '../_guards/admin.guard';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MaterializeModule,
      SharedModule,
      RouterModule.forChild([
          {
              path: 'admin',
              component: AdminComponent,
              children: [
                  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] }
              ]
          }
      ])
  ],
  providers: [],
  declarations: [AdminComponent, DashboardComponent]
})
export class AdminModule { }
