import {Review} from './review.interface';

export interface Association {
    _id: string;
    name: string;
    email: string;
    image: string;
    link: string;
    likes:Array<string>;
    phone: any;
    address: any;
    details: string;
    services: Array<string>;
    platformReview: Review;
    reviews: Array<Review>;
}
