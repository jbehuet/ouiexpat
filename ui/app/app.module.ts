import { CookieService } from 'ng2-cookies';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RollbarModule, RollbarService } from 'angular-rollbar/lib/';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { ROUTES } from './app.routes';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RollbarModule.forRoot({
            accessToken: 'f548a573433d41a680fc4b738428f31d'
        }),
        RouterModule.forRoot(ROUTES),
        AuthModule,
        DashboardModule
    ],
    providers: [RollbarService, CookieService, AuthGuard, AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
