import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import ReviewFormat from '../formats/ReviewFormat';
import AddressFormat from '../formats/AddressFormat';

interface IAssociation extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    photo: string;
    link: string;
    phone: PhoneFormat;
    address: AddressFormat;
    details: string;
    services: Array<string>;
    platformReview: ReviewFormat;
    reviews: Array<ReviewFormat>;
    createdAt: Date;
    updatedAt: Date;
}

export default IAssociation;
