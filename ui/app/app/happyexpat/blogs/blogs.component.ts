import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../_services/blog.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_interfaces/user.interface';
import { ToastHelper } from '../../../_helpers/toast.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'oe-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  @Input() expatriation: any;
  private currentUser: User;
  public blogs: Array<any> = [];


  constructor(private _blogService: BlogService,
    private _authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this._authenticationService.user;
    this.blogs = this._blogService.blogs;
    this._loadBlogs();

    this._authenticationService.userChange.subscribe(
      user => this.currentUser = user
    );
  }

  addOrRemoveToFav(blog) {
    if (!!this.currentUser.favorites.blogs.find(e => e._id === blog._id)) {
      this._blogService.removeFromFavorites(blog).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    } else {
      this._blogService.addToFavorites(blog).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    }
  }

  isFav(blog) {
    return !!this.currentUser.favorites.blogs.find(e => e._id === blog._id);
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
    this.router.navigate(['happyexpat', 'blog', 'detail', blog._id])
  }

  private _loadBlogs() {
    this._blogService.getAll().subscribe(blogs => {
      this.blogs = blogs;
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

}
