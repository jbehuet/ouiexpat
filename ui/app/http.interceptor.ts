import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { CookieService } from 'ng2-cookies';
import { Observable } from "rxjs/Rx";

export class InterceptedHttp extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _cookieService: CookieService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url,this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');

        if (this._cookieService.get('__session')) {
            const session = JSON.parse(this._cookieService.get('__session'));
            options.headers.append('Authorization', session.token);
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((error, source) => {
            return Observable.throw(error);
            // if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
            //     this._router.navigate(['/login']);
            //     return Observable.empty();
            // } else {
            //     return Observable.throw(err);
            // }
        });

    }
}
