import { CookieService } from 'ng2-cookies';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
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

  constructor(private _http: Http, private _cookieService: CookieService, private _router: Router) {
    // set token if saved in local storage
    if (this._cookieService.get(this.COOKIE_KEY)) {
      const session = JSON.parse(this._cookieService.get(this.COOKIE_KEY));
      this.token = session.token;
      this.payload = this._decodePayload();
      this.getUserById(this.payload._id).subscribe(user => {
        this.user = user;
        this.userChange.emit(this.user);
      }, (err) => {
        //ERROR
        this._router.navigate(['/auth/login']);
      });
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
        return Observable.throw((error ? error : 'Server error'))
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
        return Observable.throw((error ? error : 'Server error'))
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
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  requestResetPassword(body: any): Observable<any> {
    return this._http.post('/api/v1/auth/reset_password', body)
      .map(res => res.json())
      .map(res => {
        return true;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  resetPassword(token: string, body: any): Observable<any> {
    return this._http.post('/api/v1/auth/reset_password/' + token, body)
      .map(res => res.json())
      .map(res => {
        return true;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });

  }

  getUserById(id: String): Observable<any> {
    return this._http.get('/api/v1/users/' + id)
      .map(res => res.json())
      .map(res => {
        return res.data;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  uploadMedia(data: FormData): Promise<any> {
    return new Promise((resolve, reject) => {

      let xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            this.user = <User>res.data;
            this.userChange.emit(this.user);
            resolve(this.user);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', '/api/v1/users/media', true);
      xhr.setRequestHeader('Authorization', this.token);

      xhr.send(data);
    });
  }

  private _decodePayload(): any {
    let payload = this.token.split('.')[1];
    payload = decodeURIComponent(escape(window.atob(payload)));
    payload = JSON.parse(payload);
    return payload;
  }
}
