
import {Favorites} from './favorites.interface';
export interface User {
    _id?: String;
    firstname: String;
    lastname: String;
    password?: String;
    email: String;
    photo: String;
    address?: any;
    administrator?: boolean;
    favorites: Favorites;
    phone?: any;
    birthday?: Date;
    history?: any;
}
