import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import HistoryType from '../constants/HistoryTypeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import JobModel from '../models/JobModel';
import UserModel from '../models/UserModel';
import JobFormat from '../formats/JobFormat';
import UserFormat from '../formats/UserFormat';
import HistoryFormat from '../formats/HistoryFormat';

class JobRouter extends AbstractRouter {

    constructor() {
        super(JobModel)
        this.router.post('/:job_id/favorites', this.addToFavorites.bind(this));
        this.router.delete('/:job_id/favorites', this.removeFromFavorites.bind(this));
    }

    protected create(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);
        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);

        JobModel.create(req.body, (err: mongoose.Error, object: mongoose.Document) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.CREATED).json({ status: HTTPCode.success.CREATED, data: object });
        });

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);
        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);

        JobModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err: mongoose.Error, object: mongoose.Document) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
        });

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        JobModel.findByIdAndRemove(req.params.id, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }

    private addToFavorites(req: IRequest, res: Response, next: NextFunction) {

      UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id },
        { $push: { 'favorites.jobs': req.params.job_id } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
          if (err)
            ErrorHelper.handleMongooseError(err, res, req);
          else if (!user)
            res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
          else {

            JobModel.findOne({ _id: req.params.job_id }, (err: mongoose.Error, job: JobFormat) => {

              if (err)
                ErrorHelper.handleMongooseError(err, res, req);
              else if (!job)
                res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
              else {
                const history = <HistoryFormat>{ type: HistoryType.FAVORITES, details: job.title + " ajouté aux favoris !" };

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
        { $pull: { 'favorites.jobs': req.params.job_id } }, { new: true })
        .populate('favorites.associations')
        .populate('favorites.blogs')
        .populate('favorites.jobs')
        .exec((err: mongoose.Error, user: UserFormat) => {
          if (err)
            ErrorHelper.handleMongooseError(err, res, req);
          else if (!user)
            res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
          else {
            JobModel.findOne({ _id: req.params.job_id }, (err: mongoose.Error, job: JobFormat) => {

              if (err)
                ErrorHelper.handleMongooseError(err, res, req);
              else if (!job)
                res.status(HTTPCode.error.client.NOT_FOUND).json({ status: HTTPCode.error.client.NOT_FOUND });
              else {
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
              }
            })
          }
        });
    }


  }


  export default JobRouter
