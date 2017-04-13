import * as mongoose from 'mongoose';
import {Router, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
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

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        UserModel.create(req.body, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else {
                user.password = null;
                const token = AuthRouter.generateToken(user);
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

        console.log(bcrypt.hashSync(req.body.password, 10))

        UserModel.findOne({ email: req.body.email }).select('+password').lean().exec((err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else if (!user)
                ErrorHelper.handleError(HTTPCode.error.client.NOT_FOUND, 'User not found', res);
            else if (!bcrypt.compareSync(req.body.password, user.password))
                ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Password not match', res);
            else {
                user = <UserFormat> _.omit(user, ['password']);
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

    public static generateToken(data: any): string {
        return jwt.sign(data, CONFIG.jwt.secret, CONFIG.jwt.options);
    }

}

export default AuthRouter;
