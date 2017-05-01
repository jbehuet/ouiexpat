import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import AddressFormat from '../formats/AddressFormat';
import FavoritesFormat from '../formats/FavoritesFormat';

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
    favorites: FavoritesFormat;
    reset_token: string;
    createdAt: Date;
    updatedAt: Date;
}

export default IUser;
