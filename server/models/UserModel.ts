import * as mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const _schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  photo: {
    type: String,
    default: '/assets/img/no-avatar.png'
  },
  administrator: {
    type: Boolean,
    default: false
  },
  situation: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [(email) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    select: false
  },
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
  birthday: {
    type: Date
  },
  favorites: {
    associations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'assocation'
    }],
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }],
    jobs: []
  },
  reset_token: String
}, {
    timestamps: true
  });

const UserModel = mongoose.model<IUser>('user', _schema);

export default UserModel;
