import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpatriationService {

    public expatriations: Array<any> = [];

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

    create(expatriation: any): Observable<any> {
        return this._http.post('/api/v1/expatriations', expatriation)
            .map(res => res.json())
            .map(res => {
                this.expatriations.push(res.data)
                return this.expatriations;
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    update(expatriation: any): Observable<any> {
        return this._http.put('/api/v1/expatriations/' + expatriation._id, expatriation)
            .map(res => res.json())
            .map(res => {
                const idx = this.expatriations.findIndex(e => e._id === expatriation._id);
                this.expatriations[idx] = res.data;
                return this.expatriations;
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    delete(expatriation: any): Observable<any> {
        return this._http.delete('/api/v1/expatriations/' + expatriation._id)
            .map(res => res.json())
            .map(res => {
                const idx = this.expatriations.findIndex(e => e._id === expatriation._id);
                this.expatriations.splice(idx, 1);
                return this.expatriations;
            })
            .catch((error: any) => {
                return Observable.throw(error.json().message || 'Server error')
            });
    }

}
