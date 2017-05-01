import {Blog} from './blog.interface';
import {Association} from './association.interface';
import {Job} from './job.interface';

export interface Favorites {
    blogs: Array<Blog | string>;
    associations: Array<Association | string>;
    jobs: Array<Job | string>;
}
