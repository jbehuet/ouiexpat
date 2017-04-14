import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import AbstractRouter from './AbstractRouter';
import AuthRouter from './AuthRouter';
import UserFormat from '../formats/UserFormat';
import UserModel from '../models/UserModel';

class UserRouter extends AbstractRouter {

    constructor() {
        super(UserModel)
    }

    protected getAll(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        this.model.find({}).sort({ createdAt: "desc" }).exec((err: mongoose.Error, objects: Array<mongoose.Document>) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: objects });
        });

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (!req.authenticatedUser.administrator && req.params._id !== req.authenticatedUser._id)
            return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        // TODO Check current password
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);

        UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id }, req.body, { new: true }, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else {
                const token = AuthRouter.generateToken(user);
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user, token:token });
            }
        });

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        UserModel.findByIdAndRemove(req.params._id, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }

    private uploadMedia(req: IRequest, res: Response, next: NextFunction) {
        //TODO
    }

}

export default UserRouter;
