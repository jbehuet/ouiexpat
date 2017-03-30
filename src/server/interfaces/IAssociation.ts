import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import ReviewFormat from '../formats/ReviewFormat';

interface IAssociation extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    logo: string;
    phone: PhoneFormat;
    details: string;
    services: Array<string>;
    platform_review: ReviewFormat;
    reviews: Array<ReviewFormat>;
    createdAt: Date;
    updatedAt: Date;
}

export default IAssociation;
