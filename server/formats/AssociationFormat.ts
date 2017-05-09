import PhoneFormat from './PhoneFormat';
import ReviewFormat from './ReviewFormat';
import AddressFormat from './AddressFormat';

export default class AssociationFormat {
    _id: string;
    name: string;
    email: string;
    photo: string;
    link: string;
    likes:Array<string>;
    phone: PhoneFormat;
    address: AddressFormat;
    details: string;
    services: Array<string>;
    platformReview: ReviewFormat;
    reviews: Array<ReviewFormat>;
    createdAt: Date;
    updatedAt: Date;
    save():any {};
}
