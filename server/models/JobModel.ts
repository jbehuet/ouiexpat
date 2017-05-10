import * as mongoose from 'mongoose';
import IJob from '../interfaces/IJob';

const _schema = new mongoose.Schema({
    title: {
      type: String,
      require: true
    },
    company: {
      type: String,
      require: true
    },
    email: {
        type: String,
        validate: [(email) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }, 'Please use a valid email address'],
    },
    address: {
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
    image: String,
    link: String,
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
    contract: {
      type: String,
      enum: ['CDI', 'CDD', 'Freelance', 'Other'],
      require: true
    },
    details: {
      type: String,
      require: true
    }
}, {
        timestamps: true
    });

const JobModel = mongoose.model<IJob>('job', _schema);

export default JobModel;
