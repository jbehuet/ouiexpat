import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpatriationService {

    public expatriations:Array<any> = [];

    constructor(private _http: Http) {
    }

    getAll(): Observable<any> {
        return this._http.get('/api/v1/expatriations')
            .map(res => res.json())
            .map(res => {
                this.expatriations = res.data;
                return this.expatriations;
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

}
