import {Component, OnInit} from '@angular/core';
import {Blog} from '../../../../_interfaces/blog.interface';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../../../_services/blog.service';

@Component({
    selector: 'oe-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

    blog: Blog;

    constructor(private _route: ActivatedRoute,
                private _blogService: BlogService) {
    }

    ngOnInit() {
        this._route.paramMap
            .map(map => map.get('id'))
            .switchMap(id => this._blogService.getById(id))
            .subscribe(blog => this.blog = blog);
    }

}
