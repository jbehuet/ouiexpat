import * as mongoose from 'mongoose';
import IAssociation from '../interfaces/IAssociation';

const _schema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    email: {
        type: String,
        validate: [(email) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }, 'Please use a valid email address'],
    },
    logo: String,
    website: String,
    phone: {
        number: {
            type: String,
            default: ''
        },
        isValide: {
            type: Boolean,
            default: false
        }
    },
    details: {
      type: String,
      require: true
    },
    services: [String],
    platformReview: {
      user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
      },
      review: String,
      rate: Number
    },
    reviews: [{
      user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
      },
      review: String,
      rate: Number
    }]
}, {
        timestamps: true
    });

const AssociationModel = mongoose.model<IAssociation>('assocation', _schema);

export default AssociationModel;
