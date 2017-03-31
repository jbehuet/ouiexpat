import * as mongoose from 'mongoose';
import {Router, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import UserFormat from '../formats/UserFormat';
import CONFIG from '../config';

class AbstractRouter {
    public router: Router;
    public model: mongoose.model;

    constructor(model: mongoose.model) {
        this.router = Router();
        this.model = model;
        this.router.use(this.authenticate.bind(this));
        this.router.get('/', this.getAll.bind(this));
        this.router.get('/:id', this.getById.bind(this));
        this.router.post('/', this.create.bind(this));
        this.router.put('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
    }

    public authenticate(req: IRequest, res: Response, next: NextFunction) {

        if (_.isUndefined(req.headers.authorization)) return ErrorHelper.handleError(HTTPCode.error.client.FORBIDDEN, 'Not authorize', res);

        jwt.verify(req.headers.authorization, CONFIG.jwt.secret, (err: any, decoded: any) => {
            if (err) {
                ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, err.message, res);
            } else {
                req.authenticatedUser = decoded._doc;
                next();
            }
        });

    }

    protected getAll(req: IRequest, res: Response, next: NextFunction) {

        this.model.find({}).sort({ createdAt: "desc" }).exec((err: mongoose.Error, objects: Array<mongoose.Document>) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: objects });
        });

    }

    protected getById(req: IRequest, res: Response, next: NextFunction) {

        this.model.findById(req.params.id).exec((err: mongoose.Error, object: mongoose.Document) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
        });

    }

    protected create(req: IRequest, res: Response, next: NextFunction) {

        this.model.create(req.body, (err: mongoose.Error, object: mongoose.Document) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.CREATED).json({ status: HTTPCode.success.CREATED, data: object });
        });

    }

    protected update(req: IRequest, res: Response, next: NextFunction) {

        this.model.update({ _id: req.params.id }, req.body, {new : true }, (err: mongoose.Error, object: mongoose.Document) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
        });

    }

    protected delete(req: IRequest, res: Response, next: NextFunction) {

        this.model.findByIdAndRemove(req.params.id, (err: mongoose.Error) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else
                res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
        });

    }
}

export default AbstractRouter;
