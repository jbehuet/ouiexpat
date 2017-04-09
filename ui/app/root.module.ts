import { CookieService } from 'ng2-cookies';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RollbarModule, RollbarService } from 'angular-rollbar/lib/';

import { AuthModule } from './auth/auth.module';
import { AppModule } from './app/app.module';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';

import { RootComponent } from './root.component';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RollbarModule.forRoot({
            accessToken: 'f548a573433d41a680fc4b738428f31d'
        }),
        RouterModule.forRoot([
            // otherwise redirect to home
            { path: '**', redirectTo: '' }
        ]),
        AuthModule,
        AppModule
    ],
    providers: [RollbarService, CookieService, AuthGuard, AuthenticationService],
    bootstrap: [RootComponent]
})
export class RootModule { }
