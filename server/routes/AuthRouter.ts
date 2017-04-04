import * as mongoose from 'mongoose';
import {Router, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../config';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import UserFormat from '../formats/UserFormat';
import UserModel from '../models/UserModel';

class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.authentication.bind(this));
        this.router.post('/refresh', this.refreshToken.bind(this));
    }

    private register(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.email)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Email is require', res);
        if (_.isEmpty(req.body.password)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Password is require', res);
        if (_.isEmpty(req.body.birthday)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Bithday is require', res);

        UserModel.create(req.body, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else {
                user.password = '****';
                const token = jwt.sign(user, CONFIG.jwt.secret, CONFIG.jwt.options);
                res.status(HTTPCode.success.CREATED).json({
                    status: HTTPCode.success.CREATED,
                    data: user,
                    token: token
                })
            }
        })

    }

    private authentication(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.email)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Email is require', res);
        if (_.isEmpty(req.body.password)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Password is require', res);

        UserModel.findOne(req.body, { password: 0 }, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res);
            else if (!user)
                ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Email and password not match', res);
            else {
                const token = jwt.sign(user, CONFIG.jwt.secret, CONFIG.jwt.options);
                res.json({
                    status: HTTPCode.success.OK,
                    data: user,
                    token: token
                })
            }
        });

    }

    private refreshToken(req: IRequest, res: Response, next: NextFunction) {
        // TODO
    }

}

export default AuthRouter;
