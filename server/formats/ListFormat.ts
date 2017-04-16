import * as mongoose from 'mongoose';
import ExpatriationFormat from './ExpatriationFormat';
import ListItemFormat from './ListItemFormat';

export default class ListFormat {
    _id: mongoose.Types.ObjectId;
    title: string;
    type: string;
    icon?: string;
    countryCode?: string;
    items:Array<ListItemFormat>;
    itemsNotCompleted?:number;
    createdAt: Date;
    updatedAt: Date;
    save():any {};
    update():any {};
}
