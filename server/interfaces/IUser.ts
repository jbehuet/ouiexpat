import * as mongoose from 'mongoose';
import PhoneFormat from '../formats/PhoneFormat';
import AddressFormat from '../formats/AddressFormat';
import FavoritesFormat from '../formats/FavoritesFormat';
import HistoryFormat from '../formats/HistoryFormat';

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
    history: HistoryFormat;
    reset_token: string;
    createdAt: Date;
    updatedAt: Date;
}

export default IUser;
