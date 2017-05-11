import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import AddressFormat from '../formats/AddressFormat';

interface IJob extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    company: string;
    email: string;
    address: AddressFormat;
    image: string;
    link: string;
    website: string;
    phone: PhoneFormat;
    contract: string;
    details: string;
    createdAt: Date;
    updatedAt: Date;
}

export default IJob;
