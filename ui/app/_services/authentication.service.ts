import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post('/api/v1/auth/login', { email, password })
            .map((response: Response) => {
                if (response.status) {
                  const body = response.json();
                  // login successful if there's a jwt token in the response
                  this.token = body.token;

                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));

                  // return true to indicate successful login
                  return true;
                } else {
                  // return false to indicate failed login
                  return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;

    }
}
