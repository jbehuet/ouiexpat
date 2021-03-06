import * as mongoose from 'mongoose';
import IList from '../interfaces/IList';

const _schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    countryCode: String,
    icon: {
      type:String,
      default:'icon-key'
    },
    type: {
        type: String,
        enum: ['administrative', 'things']
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
