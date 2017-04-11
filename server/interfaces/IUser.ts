import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import ExpeditionFormat from '../formats/ExpeditionFormat';
import AddressFormat from '../formats/AddressFormat';

interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    photo: string;
    situation: string;
    address: AddressFormat;
    phone: PhoneFormat;
    birthday: Date;
    expeditions: Array<ExpeditionFormat>;
    createdAt: Date;
    updatedAt: Date;
}

export default IUser;
