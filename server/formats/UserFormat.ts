import * as mongoose from 'mongoose';
import PhoneFormat from './PhoneFormat';
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
    reset_token: string;
    createdAt: Date;
    updatedAt: Date;
    save():any {};
    update():any {};
}
