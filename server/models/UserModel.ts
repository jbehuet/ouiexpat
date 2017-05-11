import * as mongoose from 'mongoose';
import IUser from '../interfaces/IUser';
import HistoryFormat from '../formats/HistoryFormat';

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
      ref: 'association'
    }],
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }],
    jobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job'
    }]
  },
  history: [
    {
      type: { type: String },
      date: { type: Date, default: Date.now },
      object: String,
      details: String
    }
  ],
  reset_token: String
}, {
    timestamps: true
  });

let UserModel = mongoose.model<IUser>('user', _schema);

UserModel.saveToHistory = function(_id: String, history: HistoryFormat): Promise<any> {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate({ _id: _id }, { $push: { 'history': history } }, { new: true })
    .populate('favorites.associations')
    .populate('favorites.blogs')
    .populate('favorites.jobs')
    .exec((err, user) => {
      if (err)
        reject(err);
      else
        resolve(user);
    });
  });
}

export default UserModel;
