import {Review} from './review.interface';

export interface Association {
    _id: string;
    name: string;
    email: string;
    photo: string;
    link: string;
    phone: any;
    details: string;
    services: Array<string>;
    platformReview: Review;
    reviews: Array<Review>;
}
