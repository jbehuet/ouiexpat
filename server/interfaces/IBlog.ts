import * as mongoose from 'mongoose';
import ReviewFormat from '../formats/ReviewFormat';

interface IBlog extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
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
}

export default IBlog;
