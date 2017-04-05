import { CookieService } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;
    public user: any;

    constructor(private http: Http, private cookieService: CookieService) {
        // set token if saved in local storage
        if (this.cookieService.get('__session')) {
            const __session = JSON.parse(this.cookieService.get('__session'));
            this.token = __session.token;
            this.user = this._decodePayload()._doc;
        }
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post('/api/v1/auth/login', { email, password })
            .map(res => res.json())
            .map(res => {
                this.token = res.token;
                this.user = res.data;
                this.cookieService.set('__session', JSON.stringify({ token: this.token }));
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    logout(): void {
        // clear token, user and remove cookie to log user out
        this.token = null;
        this.user = null;
        this.cookieService.deleteAll();
    }

    register(user: any): Observable<boolean> {
        return this.http.post('/api/v1/auth/register', user)
            .map(res => res.json())
            .map(data => {
                this.token = data.token;
                localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    checkValidSession(): any {
        if (!this.token) return false;
        const payload = this._decodePayload();
        if (Math.round(new Date().getTime() / 1000) > payload.exp) {
            this.logout();
            return false;
        } else
            return true;
    }

    private _decodePayload(): any {
        let payload = this.token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        return payload;
    }
}
