import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../_services/blog.service';
import { ToastHelper } from '../../../_helpers/toast.helper';

@Component({
    selector: 'oe-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

    @Input() expatriation: any;
    public blogs: Array<any> = [];

    constructor(private _blogService: BlogService) { }

    ngOnInit() {
        this.blogs = this._blogService.blogs;
        this._loadBlogs();
    }

    private _loadBlogs() {
        this._blogService.getAll().subscribe(blogs => {
            this.blogs = blogs;
        }, (err) => {
            ToastHelper.displayError(err);
        })
    }

}
