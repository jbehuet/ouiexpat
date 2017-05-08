import {Review} from './review.interface';

export interface Blog {
    _id: string;
    name: string;
    image: string;
    category: string;
    details: string;
    link:string;
    likes:Array<string>;
    platformReview: Review;
    reviews: Array<Review>;
}
