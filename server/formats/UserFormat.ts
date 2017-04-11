import * as mongoose from 'mongoose';
import PhoneFormat from './PhoneFormat';
import ExpeditionFormat from './ExpeditionFormat';
import AddressFormat from './AddressFormat';

export default class UserFormat {
    _id: mongoose.Types.ObjectId;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    photo: string;
    situation: string;
    address: AddressFormat;
    administrator: boolean;
    phone: PhoneFormat;
    birthday: Date;
    expeditions: Array<ExpeditionFormat>;
    createdAt: Date;
    updatedAt: Date;
}
