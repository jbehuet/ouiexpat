import { Favorites } from './favorites.interface';
import { History } from './history.interface';

export interface User {
  _id?: String;
  firstname: String;
  lastname: String;
  password?: String;
  email: String;
  photo: String;
  situation: string;
  address?: any;
  administrator?: boolean;
  favorites: Favorites;
  phone?: any;
  birthday?: Date;
  history?: History;
}
