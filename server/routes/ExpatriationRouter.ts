import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import ExpatriationModel from '../models/ExpatriationModel';
import ExpatriationFormat from '../formats/ExpatriationFormat';
import ListModel from '../models/ListModel';
import ListFormat from '../formats/ListFormat';

class ExpatriationRouter extends AbstractRouter {

    constructor() {
        super(ExpatriationModel);
    }

    protected getAll(req: IRequest, res: Response, next: NextFunction) {

        ExpatriationModel.find({ owner: req.authenticatedUser._id }).sort({ date: "asc" }).exec((err: mongoose.Error, expatriations: Array<ExpatriationFormat>) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: expatriations });
        });
    }

    protected getById(req: IRequest, res: Response, next: NextFunction) {

        let query;
        if (req.authenticatedUser.administrator)
            query = { _id: req.params.id };
        else
            query = { _id: req.params.id, owner: req.authenticatedUser._id };

        ExpatriationModel.findOne(query).populate('owner').exec((err: mongoose.Error, expatriation: ExpatriationFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: expatriation });
        });

    }

    protected create(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);

        req.body.owner = req.authenticatedUser._id;
        req.body.lists = req.body.lists || [];

        Promise.all(req.body.lists.map(list => this.findList(list, req.body.location.countryCode))).then((lists) => {
            req.body.lists = lists;
            ExpatriationModel.create(req.body, (err: mongoose.Error, expatriation: ExpatriationFormat) => {
                if (err)
                    ErrorHelper.handleMongooseError(err, res, req);
                else
                    res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: expatriation });
            })

        }).catch(err => {
            ErrorHelper.handleMongooseError(err, res, req);
        })

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.date)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Date is require', res);
        if (_.isEmpty(req.body.location)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Location is require', res);

        let query;
        if (req.authenticatedUser.administrator)
            query = { _id: req.params.id };
        else
            query = { _id: req.params.id, owner: req.authenticatedUser._id };

        ExpatriationModel.findOneAndUpdate(query, req.body, { new: true },
            (err: mongoose.Error, expatriation: ExpatriationFormat) => {
                if (err)
                    ErrorHelper.handleMongooseError(err, res, req);
                else
                    res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: expatriation });
            })

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        let query;
        if (req.authenticatedUser.administrator)
            query = { _id: req.params.id };
        else
            query = { _id: req.params.id, owner: req.authenticatedUser._id };


        ExpatriationModel.findOneAndRemove(query, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }

    private findList(type: string, countryCode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ListModel.findOne({type: type, countryCode: countryCode}).exec((err: mongoose.Error, list: ListFormat) => {
                if (err)
                    reject(err);
                else if (!list) {
                    ListModel.findOne({ type: type }).exec((err: mongoose.Error, list: ListFormat) => {
                        if (err)
                            reject(err);
                        else
                            resolve(list);
                    })
                }
                else
                    resolve(list);
            });
        })
    }

}

export default ExpatriationRouter;
