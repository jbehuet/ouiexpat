import {Blog} from './blog.interface';
import {Association} from './association.interface';
import {Job} from './job.interface';

export interface Favorites {
    blogs: Array<Blog>;
    associations: Array<Association>;
    jobs: Array<Job>;
}
