import * as mongoose from 'mongoose';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import AbstractRouter from './AbstractRouter';
import AssociationModel from '../models/AssociationModel';

class AssociationRouter extends AbstractRouter {

    constructor() {
        super(AssociationModel)
        this.router.post('/:association_id/reviews', this.createReview.bind(this));
        this.router.put('/:association_id/reviews/:id', this.updateReview.bind(this));
        this.router.delete('/:association_id/reviews/:id', this.deleteReview.bind(this));
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

export default AssociationRouter
