import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../_services/authentication.service';
import { Association } from '../_interfaces/association.interface';
import { Review } from '../_interfaces/review.interface';

@Injectable()
export class AssociationService {

  public associations: Array<Association> = [];
  public association: Association;

  constructor(private _http: Http, private _authenticationService: AuthenticationService) {
  }

  getAll(): Observable<any> {
    return this._http.get('/api/v1/associations')
      .map(res => res.json())
      .map(res => {
        this.associations = res.data;
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  getById(id: string): Observable<any> {
    return this._http.get('/api/v1/associations/' + id)
      .map(res => res.json())
      .map(res => {
        this.association = res.data;
        return this.association;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  create(association: Association): Observable<any> {
    return this._http.post('/api/v1/associations', association)
      .map(res => res.json())
      .map(res => {
        this.associations.push(res.data)
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  update(association: Association): Observable<any> {
    return this._http.put('/api/v1/associations/' + association._id, association)
      .map(res => res.json())
      .map(res => {
        const idx = this.associations.findIndex(e => e._id === association._id);
        this.associations[idx] = res.data;
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  delete(association: Association): Observable<any> {
    return this._http.delete('/api/v1/associations/' + association._id)
      .map(res => res.json())
      .map(res => {
        const idx = this.associations.findIndex(e => e._id === association._id);
        this.associations.splice(idx, 1);
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  like(association: Association): Observable<any> {
    return this._http.post('/api/v1/associations/' + association._id + '/like', association)
      .map(res => res.json())
      .map(res => {
        const idx = this.associations.findIndex(e => e._id === association._id);
        this.associations[idx] = res.data.association;
        this._authenticationService.user = res.data.user;
        this._authenticationService.userChange.emit(res.data.user);
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  dislike(association: Association): Observable<any> {
    return this._http.post('/api/v1/associations/' + association._id + '/dislike', association)
      .map(res => res.json())
      .map(res => {
        const idx = this.associations.findIndex(e => e._id === association._id);
        this.associations[idx] = res.data;
        return this.associations;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  addToFavorites(association: Association): Observable<any> {
    return this._http.post('/api/v1/associations/' + association._id + '/favorites', association)
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

  removeFromFavorites(association: Association): Observable<any> {
    return this._http.delete('/api/v1/associations/' + association._id + '/favorites', association)
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

  postReview(association: Association, review: Review): Observable<any> {
    return this._http.post('/api/v1/blogs/' + association._id + '/reviews', review)
      .map(res => res.json())
      .map(res => {
        if (res.data.user) {
          this._authenticationService.user = res.data.user
          this._authenticationService.userChange.emit(res.data.user)
        }
        return res.data.association;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

  deleteReview(association: Association, review: Review): Observable<any> {
    return this._http.delete('/api/v1/blogs/' + association._id + '/reviews', review)
      .map(res => res.json())
      .map(res => {
        if (res.data.user) {
          this._authenticationService.user = res.data.user
          this._authenticationService.userChange.emit(res.data.user)
        }
        return res.data.association;
      })
      .catch((error: any) => {
        return Observable.throw((error ? error : 'Server error'))
      });
  }

}
