import { CookieService } from 'ng2-cookies';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RollbarModule, RollbarService } from 'angular-rollbar/lib/';

import { AuthModule } from './auth/auth.module';
import { AppModule } from './app/app.module';
import { AdminModule } from './admin/admin.module';

import { httpFactory } from "./_factories/http.factory";

import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

import { AuthenticationService } from './_services/authentication.service';
import { ExpatriationService } from './_services/expatriation.service';
import { AssociationService } from './_services/association.service';
import { BlogService } from './_services/blog.service';
import { JobService } from './_services/job.service';
import { StatisticService } from './_services/statistics.service';

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
    AppModule,
    AdminModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, CookieService, Router]
    },
    AuthGuard, AdminGuard,
    RollbarService, CookieService, AuthenticationService,
    AssociationService, ExpatriationService, BlogService,
    JobService, StatisticService],
  bootstrap: [RootComponent]
})
export class RootModule { }
