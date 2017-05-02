import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import HistoryType from '../constants/HistoryTypeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import BlogModel from '../models/BlogModel';
import UserModel from '../models/UserModel';

import BlogFormat from '../formats/BlogFormat';
import UserFormat from '../formats/UserFormat';
import HistoryFormat from '../formats/HistoryFormat';
import ReviewFormat from '../formats/ReviewFormat';

class BlogRouter extends AbstractRouter {

  constructor() {
    super(BlogModel)
    this.router.post('/:blog_id/favorites', this.addToFavorites.bind(this));
    this.router.delete('/:blog_id/favorites', this.removeFromFavorites.bind(this));
    this.router.post('/:blog_id/like', this.like.bind(this));
    this.router.post('/:blog_id/dislike', this.dislike.bind(this));
    this.router.post('/:blog_id/reviews', this.updateOrCreateReview.bind(this));
    this.router.delete('/:blog_id/reviews', this.deleteReview.bind(this));
  }

  protected getById(req: IRequest, res: Response, next: NextFunction) {

    BlogModel.findById(req.params.id).populate('reviews.user').exec((err: mongoose.Error, object: mongoose.Document) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
    });

  }

  protected create(req: IRequest, res: Response, next: NextFunction) {

    if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    BlogModel.create(req.body, (err: mongoose.Error, blog: BlogFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.CREATED).json({ status: HTTPCode.success.CREATED, data: blog });
    });

  }

  protected update(req: IRequest, res: Response, next: NextFunction) {

    if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    BlogModel.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err: mongoose.Error, blog: BlogFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
    });

  }

  protected delete(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    BlogModel.findByIdAndRemove(req.params._id, (err: mongoose.Error) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
    });

  }

  private like(req: IRequest, res: Response, next: NextFunction) {

    BlogModel.findOne({ _id: req.params.blog_id }).exec((err: mongoose.Error, blog: BlogFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else if (!blog) {
        res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
      }
      else {
        if (!blog.likes.find(l => l === req.authenticatedUser._id)) {
          blog.likes.push(req.authenticatedUser._id);
          blog.save();

          const history = <HistoryFormat>{ type: HistoryType.LIKES, details: blog.name + " liké !" };

          UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
          }).catch(err => {
            ErrorHelper.handleMongooseError(err, res, req);
          })

        } else {
          res.status(HTTPCode.error.client.CONFLICT).json({ status: HTTPCode.error.client.CONFLICT });
        }
      }
    })
  }

  private dislike(req: IRequest, res: Response, next: NextFunction) {

    BlogModel.findOne({ _id: req.params.blog_id }).exec((err: mongoose.Error, blog: BlogFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else if (!blog) {
        res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
      }
      else {
        if (!blog.likes.find(l => l === req.authenticatedUser._id)) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        } else {
          blog.likes = blog.likes.filter(l => l !== req.authenticatedUser._id);
          blog.save();

          res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
        }
      }
    })
  }

  private updateOrCreateReview(req: IRequest, res: Response, next: NextFunction) {

    BlogModel.findOne({ _id: req.params.blog_id })
      .populate('reviews.user')
      .exec((err: mongoose.Error, blog: BlogFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!blog) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        }
        else {
          let review = blog.reviews.find(r => r.user.email === req.authenticatedUser.email) || new ReviewFormat();
          let isNew = _.isEmpty(review.user)

          review.user = req.authenticatedUser;
          review.review = req.body.review;
          review.rate = req.body.rate;

          if (isNew) {
            review.date = new Date();
            blog.reviews.push(review);
          }

          blog.save();
          if (isNew) {
            const history = <HistoryFormat>{ type: HistoryType.MESSAGE, details: "Commentaires ajouté à " + blog.name };

            UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
              res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
            }).catch(err => {
              ErrorHelper.handleMongooseError(err, res, req);
            })
          } else {
            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
          }

        }
      });

  }

  private deleteReview(req: IRequest, res: Response, next: NextFunction) {

    BlogModel.findOne({ _id: req.params.blog_id })
      .populate('reviews.user')
      .exec((err: mongoose.Error, blog: BlogFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!blog) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        }
        else {

          blog.reviews = blog.reviews.filter(r => r.user.email !== req.authenticatedUser.email);
          blog.save();

          const history = <HistoryFormat>{ type: HistoryType.DELETE, details: "Commentaires supprimé de " + blog.name };

          UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: blog });
          }).catch(err => {
            ErrorHelper.handleMongooseError(err, res, req);
          })

        }
      });
  }

  private addToFavorites(req: IRequest, res: Response, next: NextFunction) {

    UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id },
      { $push: { 'favorites.blogs': req.params.blog_id } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!user)
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        else {

          BlogModel.findOne({ _id: req.params.blog_id }, (err: mongoose.Error, blog: BlogFormat) => {

            if (err)
              ErrorHelper.handleMongooseError(err, res, req);
            else {
              const history = <HistoryFormat>{ type: HistoryType.FAVORITES, details: blog.name + " ajouté aux favoris !" };

              UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
              }).catch(err => {
                ErrorHelper.handleMongooseError(err, res, req);
              })
            }
          })

        }
      });
  }

  private removeFromFavorites(req: IRequest, res: Response, next: NextFunction) {

    UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id },
      { $pull: { 'favorites.blogs': req.params.blog_id } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!user)
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        else {
          BlogModel.findOne({ _id: req.params.blog_id }, (err: mongoose.Error, blog: BlogFormat) => {

            if (err)
              ErrorHelper.handleMongooseError(err, res, req);
            else {
              res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
            }
          })
        }
      });
  }


}

export default BlogRouter;
