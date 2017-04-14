import * as mongoose from 'mongoose';
import UserFormat from '../formats/UserFormat';
import AddressFormat from '../formats/AddressFormat';

interface IExpatriation extends mongoose.Document {
  owner: UserFormat,
  location: AddressFormat,
  date: Date
}

export default IExpatriation;
