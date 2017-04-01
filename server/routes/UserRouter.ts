import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import AbstractRouter from './AbstractRouter';
import ExpeditionFormat from '../formats/ExpeditionFormat';
import UserFormat from '../formats/UserFormat';
import UserModel from '../models/UserModel';

class UserRouter extends AbstractRouter {

    constructor() {
        super(UserModel)
        this.router.post('/expeditions', this.createExpedition.bind(this));
        this.router.put('/expeditions/:id', this.updateExpedition.bind(this));
        this.router.delete('/expeditions/:id', this.deleteExpedition.bind(this));
    }

    protected getAll(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        this.model.find({}).sort({ createdAt: "desc" }).exec((err: mongoose.Error, objects: Array<mongoose.Document>) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: objects });
        });

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (!req.authenticatedUser.administrator && req.params._id !== req.authenticatedUser._id)
            return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        UserModel.update({ _id: req.params._id }, req.body, { new: true }, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
        });

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        UserModel.findByIdAndRemove(req.params._id, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }

    private uploadMedia(req: IRequest, res: Response, next: NextFunction) {
        //TODO
    }

    private createExpedition(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);

        UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id },
            { $push: { "expeditions": req.body } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
                if (err)
                    ErrorHelper.handleMongooseError(err, res);
                else
                    res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
            });

    }

    private updateExpedition(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.date)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Date is require', res);
        if (_.isEmpty(req.body.location)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Location is require', res);

        UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id, 'expeditions._id': req.params.id },
            { $set: { "expeditions.$": req.body } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
                if (err)
                    ErrorHelper.handleMongooseError(err, res);
                else
                    res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
            });

    }

    private deleteExpedition(req: IRequest, res: Response, next: NextFunction) {

        UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id },
            { $pull: { "expeditions": { "_id": req.params.id } } }, { new: true }, (err: mongoose.Error, user: UserFormat) => {
                if (err)
                    ErrorHelper.handleMongooseError(err, res);
                else
                    res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
            });

    }

}

export default UserRouter;
