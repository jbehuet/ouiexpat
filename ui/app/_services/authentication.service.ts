import { CookieService } from 'ng2-cookies';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '../_interfaces/user.interface';

declare function escape(s: string): string;

@Injectable()
export class AuthenticationService {

    public readonly COOKIE_KEY: string = "__session";
    public token: string;
    public payload: any;
    public user: User;
    public userChange: EventEmitter<User> = new EventEmitter();

    constructor(private _http: Http, private _cookieService: CookieService) {
        // set token if saved in local storage
        if (this._cookieService.get(this.COOKIE_KEY)) {
            const session = JSON.parse(this._cookieService.get(this.COOKIE_KEY));
            this.token = session.token;
            this.payload = this._decodePayload();
            this.user = this.payload._doc;
        }
    }

    login(email: string, password: string): Observable<any> {
        return this._http.post('/api/v1/auth/login', { email, password })
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.payload = this._decodePayload();
                this.user = res.data;
                this._cookieService.set(this.COOKIE_KEY, JSON.stringify({ token: this.token }), this.payload.exp, '/');
                return this.user;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    logout(): void {
        // clear token, user and remove cookie to log user out
        this.token = null;
        this.user = null;
        this._cookieService.deleteAll('/');
    }

    register(user: User): Observable<boolean> {
        return this._http.post('/api/v1/auth/register', user)
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.payload = this._decodePayload();
                this.user = res.data;
                this._cookieService.set(this.COOKIE_KEY, JSON.stringify({ token: this.token }), this.payload.exp, '/');
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    checkValidSession(): boolean {
        if (!this.payload) return false;
        if (Math.round(new Date().getTime() / 1000) > this.payload.exp) {
            this.logout();
            return false;
        } else {
            return true;
        }
    }

    updateProfil(user: User): Observable<any> {
        return this._http.put('/api/v1/users/' + user._id, user)
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.payload = this._decodePayload();
                this.user = res.data;
                this._cookieService.set(this.COOKIE_KEY, JSON.stringify({ token: this.token }), this.payload.exp, '/');
                this.userChange.emit(this.user);
                return this.user;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    requestResetPassword(body: any): Observable<any> {
        return this._http.post('/api/v1/auth/reset_password', body)
            .map(res => res.json())
            .map(res => {
                return true;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    resetPassword(token: string, body: any): Observable<any> {
        return this._http.post('/api/v1/auth/reset_password/' + token, body)
            .map(res => res.json())
            .map(res => {
                return true;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });

    }


    private _decodePayload(): any {
        let payload = this.token.split('.')[1];
        payload = decodeURIComponent(escape(window.atob(payload)));
        payload = JSON.parse(payload);
        return payload;
    }
}
