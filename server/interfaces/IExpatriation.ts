import * as mongoose from 'mongoose';
import UserFormat from '../formats/UserFormat';
import AddressFormat from '../formats/AddressFormat';
import ListFormat from '../formats/ListFormat';

interface IExpatriation extends mongoose.Document {
  owner: UserFormat,
  location: AddressFormat,
  date: Date,
  lists:Array<ListFormat>
}

export default IExpatriation;
