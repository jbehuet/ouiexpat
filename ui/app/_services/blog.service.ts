import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {Blog} from '../_interfaces/blog.interface';

@Injectable()
export class BlogService {

    public blogs: Array<Blog> = [];
    public blog: Blog;

    constructor(private _http: Http) {
    }

    getAll(): Observable<any> {
        return this._http.get('/api/v1/blogs')
            .map(res => res.json())
            .map(res => {
                this.blogs = res.data;
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    getById(id:string): Observable<any> {
        return this._http.get('/api/v1/blogs/'+ id)
            .map(res => res.json())
            .map(res => {
                this.blog = res.data;
                return this.blog;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    create(blog: any): Observable<any> {
        return this._http.post('/api/v1/blogs', blog)
            .map(res => res.json())
            .map(res => {
                this.blogs.push(res.data)
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    update(blog: any): Observable<any> {
        return this._http.put('/api/v1/blogs/' + blog._id, blog)
            .map(res => res.json())
            .map(res => {
                const idx = this.blogs.findIndex(e => e._id === blog._id);
                this.blogs[idx] = res.data;
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    delete(blog: any): Observable<any> {
        return this._http.delete('/api/v1/blogs/' + blog._id)
            .map(res => res.json())
            .map(res => {
                const idx = this.blogs.findIndex(e => e._id === blog._id);
                this.blogs.splice(idx, 1);
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    like(blog: any): Observable<any> {
        return this._http.post('/api/v1/blogs/' + blog._id + '/like', blog)
            .map(res => res.json())
            .map(res => {
                const idx = this.blogs.findIndex(e => e._id === blog._id);
                this.blogs[idx] = res.data;
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

    dislike(blog: any): Observable<any> {
        return this._http.post('/api/v1/blogs/' + blog._id + '/dislike', blog)
            .map(res => res.json())
            .map(res => {
                const idx = this.blogs.findIndex(e => e._id === blog._id);
                this.blogs[idx] = res.data;
                return this.blogs;
            })
            .catch((error: any) => {
                return Observable.throw((error ? error.statusText : 'Server error'))
            });
    }

}
