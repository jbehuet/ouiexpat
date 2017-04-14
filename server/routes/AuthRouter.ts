import * as mongoose from 'mongoose';
import {Router, Response, NextFunction} from 'express';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import CONFIG from '../config';
import HTTPCode from '../constants/HttpCodeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import MailHelper from '../helpers/MailHelper';
import UserFormat from '../formats/UserFormat';
import UserModel from '../models/UserModel';

class AuthRouter {
    public router: Router;
    private _mailer: MailHelper;

    constructor() {
        this.router = Router();
        this._mailer = new MailHelper();
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.authentication.bind(this));
        this.router.post('/reset_password', this.resetToken.bind(this));
        this.router.post('/reset_password/:token', this.resetPassword.bind(this));
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

        UserModel.findOne({ email: req.body.email }).select("+password").exec((err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else if (!user)
                ErrorHelper.handleError(HTTPCode.error.client.NOT_FOUND, 'User not found', res);
            else if (!bcrypt.compareSync(req.body.password, user.password))
                ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Password not match', res);
            else {
                user.password = null;
                const token = jwt.sign(user, CONFIG.jwt.secret, CONFIG.jwt.options);
                res.json({
                    status: HTTPCode.success.OK,
                    data: user,
                    token: token
                })
            }
        });

    }

    private resetToken(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.email)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Email is require', res);

        UserModel.findOne({ email: req.body.email }, (err: mongoose.Error, user: UserFormat) => {
            if (err)
                ErrorHelper.handleMongooseError(err, res, req);
            else if (!user)
                ErrorHelper.handleError(HTTPCode.error.client.NOT_FOUND, 'User not found', res);
            else {
                const reset_token = jwt.sign({ email: user.email }, CONFIG.jwt.secret, CONFIG.jwt.reset_options);
                UserModel.update({ email: req.body.email }, { reset_token }, (err) => {
                    if (err)
                        ErrorHelper.handleMongooseError(err, res, req);
                    else {
                        this._mailer.send('Reset password', 'reset-password', { passwordResetUrl: CONFIG.url.reset_password + reset_token }, user.email);
                        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
                    }
                })
            }
        });

    }

    private resetPassword(req: IRequest, res: Response, next: NextFunction) {

        if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
        if (_.isEmpty(req.body.new_password)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'New password is require', res);

        jwt.verify(req.params.token, CONFIG.jwt.secret, (err: any, decoded: any) => {
            if (err) {
                ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, err.message, res);
            } else {
                const email = decoded.email;
                req.body.new_password = bcrypt.hashSync(req.body.new_password, 10);

                UserModel.findOneAndUpdate({ email: email }, { $set: { password: req.body.new_password, reset_token: '' } }, { new: true })
                    .exec((err: mongoose.Error, user: UserFormat) => {
                        if (err)
                            ErrorHelper.handleMongooseError(err, res, req);
                        else if (!user)
                            ErrorHelper.handleError(HTTPCode.error.client.NOT_FOUND, 'User not found', res);
                        else {
                            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
                        }
                    });
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
