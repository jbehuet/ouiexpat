import * as mongoose from 'mongoose';
import IBlog from '../interfaces/IBlog';

const _schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    photo: {
      type: String,
      default : 'to be define'
    },
    category: {
      type: String,
      enum: ['Other'],
      default: 'Other'
    },
    detailt: {
      type: String,
      require: true
    },
    link: String,
    likes: [String],
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

const BlogModel = mongoose.model<IBlog>('blog', _schema);

export default BlogModel;
