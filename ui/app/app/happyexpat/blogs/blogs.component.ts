import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../_services/blog.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_interfaces/user.interface';
import { ToastHelper } from '../../../_helpers/toast.helper';

@Component({
    selector: 'oe-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

    @Input() expatriation: any;
    private currentUser: User;
    public blogs: Array<any> = [];

    constructor(private _blogService: BlogService, private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this._authenticationService.user;
        this.blogs = this._blogService.blogs;
        this._loadBlogs();
    }

    addOrRemoveToFav(blog){

    }

    isFav(blog){
      return true;
    }

    isLiked(blog) {
        return !!blog.likes.find(e => e === this.currentUser._id);
    }

    likeOrDislike(blog) {
        if (!!blog.likes.find(e => e === this.currentUser._id)) {
            this._blogService.dislike(blog).subscribe(blogs => {
                this.blogs = blogs;
            }, (err) => {
                ToastHelper.displayError(err);
            })
        } else {
            this._blogService.like(blog).subscribe(blogs => {
                this.blogs = blogs;
            }, (err) => {
                ToastHelper.displayError(err);
            })
        }
    }

    seeDetail(blog) {
        if (!(/^https?:\/\//).test(blog.link))
            blog.link = 'http://' + blog.link
        window.open(blog.link);
    }

    private _loadBlogs() {
        this._blogService.getAll().subscribe(blogs => {
            this.blogs = blogs;
        }, (err) => {
            ToastHelper.displayError(err);
        })
    }

}
