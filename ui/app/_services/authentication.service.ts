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
            .map(res => res.json())
            .map((response: Response) => {
                const data = response.json();
                this.token = data.token;
                localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
            })
            .catch((error: any) => {
              return Observable.throw(error.json().message || 'Server error')
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
