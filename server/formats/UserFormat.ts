import * as mongoose from 'mongoose';
import PhoneFormat from './PhoneFormat';
import AddressFormat from './AddressFormat';
import FavoritesFormat from './FavoritesFormat';
import HistoryFormat from './HistoryFormat';

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
    favorites: FavoritesFormat;
    history: Array<HistoryFormat>;
    reset_token: string;
    createdAt: Date;
    updatedAt: Date;
    save():any {};
    update():any {};
}
