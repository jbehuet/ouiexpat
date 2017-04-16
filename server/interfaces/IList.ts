import * as mongoose from 'mongoose';
import ListItemFormat from '../formats/ListItemFormat';

interface IList extends mongoose.Document {
  _id: mongoose.Types.ObjectId,
  title: string,
  type: string,
  icon?: string,
  countryCode?: string,
  items:Array<ListItemFormat>,
  createdAt: Date,
  updatedAt: Date
}

export default IList;
