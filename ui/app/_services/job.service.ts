import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../_services/authentication.service';
import { Job } from '../_interfaces/job.interface';

@Injectable()
export class JobService {

  public jobs: Array<Job> = [];
  public job: Job;

  constructor(private _http: Http, private _authenticationService: AuthenticationService) {
  }

  getAll(): Observable<any> {
    return this._http.get('/api/v1/jobs')
      .map(res => res.json())
      .map(res => {
        this.jobs = res.data;
        return this.jobs;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  getById(id: string): Observable<any> {
    return this._http.get('/api/v1/jobs/' + id)
      .map(res => res.json())
      .map(res => {
        this.job = res.data;
        return this.job;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  create(job: Job): Observable<any> {
    return this._http.post('/api/v1/jobs', job)
      .map(res => res.json())
      .map(res => {
        this.jobs.push(res.data)
        return this.jobs;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  update(job: Job): Observable<any> {
    return this._http.put('/api/v1/jobs/' + job._id, job)
      .map(res => res.json())
      .map(res => {
        const idx = this.jobs.findIndex(e => e._id === job._id);
        this.jobs[idx] = res.data;
        return this.jobs;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  delete(job: Job): Observable<any> {
    return this._http.delete('/api/v1/jobs/' + job._id)
      .map(res => res.json())
      .map(res => {
        const idx = this.jobs.findIndex(e => e._id === job._id);
        this.jobs.splice(idx, 1);
        return this.jobs;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  addToFavorites(job: Job): Observable<any> {
    return this._http.post('/api/v1/jobs/' + job._id + '/favorites', job)
      .map(res => res.json())
      .map(res => {
        this._authenticationService.user = res.data
        this._authenticationService.userChange.emit(res.data)
        return true;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  removeFromFavorites(job: Job): Observable<any> {
    return this._http.delete('/api/v1/jobs/' + job._id + '/favorites', job)
      .map(res => res.json())
      .map(res => {
        this._authenticationService.user = res.data
        this._authenticationService.userChange.emit(res.data)
        return true;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

}
