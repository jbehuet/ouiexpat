import {XHRBackend, Http, RequestOptions} from "@angular/http";
import { CookieService } from 'ng2-cookies';
import { InterceptedHttp } from "../http.interceptor";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, cookieService: CookieService ): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, cookieService);
}
