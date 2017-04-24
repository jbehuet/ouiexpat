import ReviewFormat from './ReviewFormat';

export default class BlogFormat {
    name: string;
    photo: string;
    category: string;
    details: string;
    link:string;
    likes:Array<string>;
    platformReview: ReviewFormat;
    reviews: Array<ReviewFormat>;
    createdAt: Date;
    updatedAt: Date;
    save():any {};
}
