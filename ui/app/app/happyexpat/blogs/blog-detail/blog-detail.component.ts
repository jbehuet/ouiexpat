import {Component, OnInit} from '@angular/core';
import {Blog} from '../../../../_interfaces/blog.interface';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../../../_services/blog.service';
import {User} from '../../../../_interfaces/user.interface';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {ToastHelper} from '../../../../_helpers/toast.helper';
import * as _ from 'lodash';

@Component({
    selector: 'oe-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

    blog: Blog;
    private currentUser: User;

    constructor(private _route: ActivatedRoute,
                private _blogService: BlogService,
                private _authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.currentUser = this._authenticationService.user;
        this._route.paramMap
            .map(map => map.get('id'))
            .switchMap(id => this._blogService.getById(id))
            .subscribe(blog => this.blog = blog);
        console.log(this.blog)
    }

    addOrRemoveToFav(blog){
        if (!blog) {return false}
        // if (!!blog.favorites.blogs.find(e => e === this.currentUser._id)) {
        //     this._blogService.removeFavorite(blog).subscribe(blogs => {
        //         this.blogs = blogs;
        //     }, (err) => {
        //         ToastHelper.displayError(err);
        //     })
        // } else {
        //     this._blogService.addFavorite(blog).subscribe(blogs => {
        //         this.blogs = blogs;
        //     }, (err) => {
        //         ToastHelper.displayError(err);
        //     })
        // }
    }

    isFav(blog){
        if (!blog) {return false}
        return !!this.currentUser.favorites.blogs.find(e => e === this.currentUser._id);
    }

    isLiked(blog) {
        if (!blog) {return false}
        return !!blog.likes.find(e => e === this.currentUser._id);
    }

    likeOrDislike(blog) {
        if (!blog) {return false}
        if (!!blog.likes.find(e => e === this.currentUser._id)) {
            this._blogService.dislike(blog).subscribe(() => {
                _.remove(blog.likes, function (like) {
                    return like === blog._id
                });
            }, (err) => {
                ToastHelper.displayError(err);
            })
        } else {
            this._blogService.like(blog).subscribe(() => {
                blog.likes.push(this.currentUser._id);
            }, (err) => {
                ToastHelper.displayError(err);
            })
        }
    }

    visit(blog) {
        if (!blog) {return false}
        if (!(/^https?:\/\//).test(blog.link))
            blog.link = 'http://' + blog.link
        window.open(blog.link);
    }

}
