import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class StatisticService {

  public statistics: any = {};

  constructor(private _http: Http) {
  }

  getAll(): Observable<any> {
    return this._http.get('/api/v1/statistics')
      .map(res => res.json())
      .map(res => {
        this.statistics = res.data;
        return this.statistics;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

}
