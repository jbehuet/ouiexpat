import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import JobModel from '../models/JobModel';
import JobFormat from '../formats/JobFormat';

class JobRouter extends AbstractRouter {

    constructor() {
        super(JobModel)
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


  }


  export default JobRouter
