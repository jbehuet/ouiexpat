import {XHRBackend, Http, RequestOptions} from "@angular/http";
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { InterceptedHttp } from "../http.interceptor";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, cookieService: CookieService, router: Router ): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, cookieService, router);
}
