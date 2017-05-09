import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import HistoryType from '../constants/HistoryTypeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import AssociationModel from '../models/AssociationModel';
import AssociationFormat from '../formats/AssociationFormat';
import UserModel from '../models/UserModel';
import ReviewFormat from '../formats/ReviewFormat';
import HistoryFormat from '../formats/HistoryFormat';

class AssociationRouter extends AbstractRouter {

  constructor() {
    super(AssociationModel)
    this.router.post('/:association_id/like', this.like.bind(this));
    this.router.post('/:association_id/dislike', this.dislike.bind(this));
    this.router.post('/:association_id/reviews', this.updateOrCreateReview.bind(this));
    this.router.delete('/:association_id/reviews', this.deleteReview.bind(this));
  }

  protected getById(req: IRequest, res: Response, next: NextFunction) {

    AssociationModel.findById(req.params.id).populate('reviews.user').exec((err: mongoose.Error, object: mongoose.Document) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
    });

  }

  protected create(req: IRequest, res: Response, next: NextFunction) {

    if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    AssociationModel.create(req.body, (err: mongoose.Error, association: AssociationFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.CREATED).json({ status: HTTPCode.success.CREATED, data: association });
    });

  }

  protected update(req: IRequest, res: Response, next: NextFunction) {

    if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    AssociationModel.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err: mongoose.Error, association: AssociationFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: association });
    });

  }

  protected delete(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    AssociationModel.findByIdAndRemove(req.params._id, (err: mongoose.Error) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
    });

  }


  private like(req: IRequest, res: Response, next: NextFunction) {

    AssociationModel.findOne({ _id: req.params.association_id }).exec((err: mongoose.Error, assocation: AssociationFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else if (!assocation) {
        res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
      }
      else {
        if (!assocation.likes.find(l => l === req.authenticatedUser._id)) {
          assocation.likes.push(req.authenticatedUser._id);
          assocation.save();

          const history = <HistoryFormat>{ type: HistoryType.LIKES, details: assocation.name + " liké !" };

          UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: { assocation, user } });
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

    AssociationModel.findOne({ _id: req.params.association_id }).exec((err: mongoose.Error, assocation: AssociationFormat) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else if (!assocation) {
        res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
      }
      else {
        if (!assocation.likes.find(l => l === req.authenticatedUser._id)) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        } else {
          assocation.likes = assocation.likes.filter(l => l !== req.authenticatedUser._id);
          assocation.save();

          res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: assocation });
        }
      }
    })
  }

  private updateOrCreateReview(req: IRequest, res: Response, next: NextFunction) {

    AssociationModel.findOne({ _id: req.params.association_id })
      .populate('reviews.user')
      .exec((err: mongoose.Error, association: AssociationFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!association) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        }
        else {
          let review = association.reviews.find(r => r.user.email === req.authenticatedUser.email) || new ReviewFormat();
          let isNew = _.isEmpty(review.user)

          review.user = req.authenticatedUser;
          review.review = req.body.review;
          review.rate = req.body.rate;

          if (isNew) {
            review.date = new Date();
            association.reviews.push(review);
          }

          association.save();
          res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: association });
        }
      });

  }

  private deleteReview(req: IRequest, res: Response, next: NextFunction) {

    AssociationModel.findOne({ _id: req.params.association_id })
      .populate('reviews.user')
      .exec((err: mongoose.Error, association: AssociationFormat) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else if (!association) {
          res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
        }
        else {

          association.reviews = association.reviews.filter(r => r.user.email !== req.authenticatedUser.email);
          association.save();
          res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: association });
        }
      });
  }

}

export default AssociationRouter;
