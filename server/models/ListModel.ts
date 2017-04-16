import * as mongoose from 'mongoose';
import IList from '../interfaces/IList';

const _schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    countryCode: String,
    type: {
        type: String,
        enum: ['administrative', 'house']
    },
    items: [
        {
            title: String,
            details: String,
            completed: {
              type: Boolean,
              default: false
            }
        }
    ]
}, {
        timestamps: true
    });

const ListModel = mongoose.model<IList>('list', _schema);

export default ListModel;
