import { CookieService } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

declare function escape(s: string): string;

@Injectable()
export class AuthenticationService {

    private readonly COOKIE_KEY: string = "__session";
    public token: string;
    public payload: any;
    public user: any;

    constructor(private _http: Http, private _cookieService: CookieService) {
        // set token if saved in local storage
        if (this._cookieService.get(this.COOKIE_KEY)) {
            const session = JSON.parse(this._cookieService.get(this.COOKIE_KEY));
            this.token = session.token;
            this.payload = this._decodePayload();
            this.user = this.payload._doc;
        }
    }

    login(email: string, password: string): Observable<boolean> {
        return this._http.post('/api/v1/auth/login', { email, password })
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.payload = this._decodePayload();
                this.user = res.data;
                this._cookieService.set(this.COOKIE_KEY, JSON.stringify({ token: this.token }), this.payload.exp, '/');
                console.log('SET')
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    logout(): void {
        // clear token, user and remove cookie to log user out
        this.token = null;
        this.user = null;
        this._cookieService.deleteAll('/');
        /*if (this._cookieService.get(this.COOKIE_KEY))
            this._cookieService.set(this.COOKIE_KEY, '');*/
    }

    register(user: any): Observable<boolean> {
        return this._http.post('/api/v1/auth/register', user)
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.payload = this._decodePayload();
                this.user = res.data;
                this._cookieService.set(this.COOKIE_KEY, JSON.stringify({ token: this.token }), this.payload.exp, '/');
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    checkValidSession(): any {
        if (!this.token && !this._cookieService.get(this.COOKIE_KEY)) return false;
        this.token = this.token || JSON.parse(this._cookieService.get(this.COOKIE_KEY)).token;
        const payload = this._decodePayload();
        if (Math.round(new Date().getTime() / 1000) > payload.exp) {
            this.logout();
            return false;
        } else
            return true;
    }

    private _decodePayload(): any {
        let payload = this.token.split('.')[1];
        payload = decodeURIComponent(escape(window.atob(payload)));
        payload = JSON.parse(payload);
        return payload;
    }
}
