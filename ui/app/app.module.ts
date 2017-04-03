import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { ROUTES } from './app.routes';

import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        MaterializeModule,
        RouterModule.forRoot(ROUTES),
        AuthModule,
        DashboardModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
