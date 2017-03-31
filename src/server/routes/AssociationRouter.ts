import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import ErrorHelper from '../helpers/ErrorHelper';
import AssociationModel from '../models/AssociationModel';
import AssociationFormat from '../formats/AssociationFormat';

class AssociationRouter extends AbstractRouter {

    constructor() {
        super(AssociationModel)
        this.router.post('/:association_id/reviews', this.createReview.bind(this));
        this.router.put('/:association_id/reviews/:id', this.updateReview.bind(this));
        this.router.delete('/:association_id/reviews/:id', this.deleteReview.bind(this));
    }

    protected create(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        AssociationModel.create(req.body, (err: mongoose.Error, association: AssociationFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.CREATED).json({ status: HTTPCode.success.CREATED, data: association });
        });

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        AssociationModel.update({ _id: req.params._id }, req.body, { new: true }, (err: mongoose.Error, association: AssociationFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: association });
        });

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

        AssociationModel.findByIdAndRemove(req.params._id, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }

    private createReview(req: IRequest, res: Response, next: NextFunction) {
        // TODO
    }

    private updateReview(req: IRequest, res: Response, next: NextFunction) {
        // TODO
    }

    private deleteReview(req: IRequest, res: Response, next: NextFunction) {
        // TODO
    }

}

export default AssociationRouter;
