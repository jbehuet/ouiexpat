import PhoneFormat from './PhoneFormat';
import ReviewFormat from './ReviewFormat';

export default class AssociationFormat {
    _id: string;
    name: string;
    email: string;
    logo: string;
    phone: PhoneFormat;
    details: string;
    services: Array<string>;
    platformReview: any;
    reviews: Array<ReviewFormat>;
    createdAt: Date;
    updatedAt: Date;
    save:any;
}
