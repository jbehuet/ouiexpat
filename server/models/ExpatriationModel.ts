import * as mongoose from 'mongoose';
import IAssociation from '../interfaces/IAssociation';
import IList from '../interfaces/IList';

const _schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        value: String,
        name: String,
        city: String,
        country: String,
        postcode: String,
        countryCode: String,
        geometry: {
            coordinate: [],
            type: { type: String, default: 'Point' }
        }
    },
    date: Date,
    lists: [{
        title: String,
        type: {
            type: String,
            enum: ['administrative', 'house']
        },
        items: [
            {
                title: String,
                details: String,
                completed: Boolean
            }
        ]
    }]
}, {
        timestamps: true
    });

const ExpatriationModel = mongoose.model<IAssociation>('expatriation', _schema);

export default ExpatriationModel;
