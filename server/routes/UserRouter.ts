import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import * as formidable from 'formidable';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';
import HistoryType from '../constants/HistoryTypeConstant';
import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import AbstractRouter from './AbstractRouter';
import AuthRouter from './AuthRouter';
import UserFormat from '../formats/UserFormat';
import HistoryFormat from '../formats/HistoryFormat';
import UserModel from '../models/UserModel';

class UserRouter extends AbstractRouter {

  constructor() {
    super(UserModel)
  }

  protected getAll(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    UserModel.find({}).sort({ createdAt: "desc" }).exec((err: mongoose.Error, objects: Array<mongoose.Document>) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: objects });
    });

  }

  protected getById(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator && req.authenticatedUser._id !== req.params.id) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    UserModel.findById(req.params.id)
      .populate('favorites.associations')
      .populate('favorites.blogs')
      .populate('favorites.jobs')
      .exec((err: mongoose.Error, object: mongoose.Document) => {
        if (err)
          ErrorHelper.handleMongooseError(err, res, req);
        else
          res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: object });
      });

  }

  protected update(req: IRequest, res: Response, next: NextFunction) {

    if (_.isEmpty(req.body)) return ErrorHelper.handleError(HTTPCode.error.client.BAD_REQUEST, 'Request body is empty', res);
    if (!req.authenticatedUser.administrator && req.params.id !== req.authenticatedUser._id)
      return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    // TODO Check current password
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);

    const history = <HistoryFormat>{ type: HistoryType.ACCOUNT, details: "Mise à jours du compte." };

    UserModel.saveToHistory(req.authenticatedUser._id, history).then((user) => {
      req.body.history = user.history;
      UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id }, req.body, { new: true })
        .populate('favorites.associations')
        .populate('favorites.blogs')
        .populate('favorites.jobs')
        .exec((err: mongoose.Error, user: UserFormat) => {
          if (err)
            ErrorHelper.handleMongooseError(err, res, req);
          else {
            const token = AuthRouter.generateToken({ _id: user._id, email: user.email, administrator: user.administrator });
            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user, token: token });
          }
        });
    }).catch(err => {
      ErrorHelper.handleMongooseError(err, res, req);
    })

  }

  protected delete(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    UserModel.findByIdAndRemove(req.params.id, (err: mongoose.Error) => {
      if (err)
        ErrorHelper.handleMongooseError(err, res, req);
      else
        res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK });
    });

  }

  protected upload(req: IRequest, res: Response, next: NextFunction) {
    let fileName;
    let form = new formidable.IncomingForm();
    const uploadPath = path.join('dist/server/uploads/users/');
    form.uploadDir = uploadPath;

    //TODO Depreciation
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    form.on('file', (field, file) => {
      const ext = file.name.split('.').pop();
      fileName = req.authenticatedUser._id + '_' + new Date().getTime() + '.' + ext
      fs.renameSync(file.path, uploadPath + fileName);
    }).on('end', () => {

      const history = <HistoryFormat>{ type: HistoryType.ACCOUNT, details: "Mise à jours du compte." };

      UserModel.findOneAndUpdate({ _id: req.authenticatedUser._id }, { photo: 'uploads/users/' + fileName, $push: { history: history } }, { new: true })
        .populate('favorites.associations')
        .populate('favorites.blogs')
        .populate('favorites.jobs')
        .exec((err: mongoose.Error, user: UserFormat) => {
          if (err)
            ErrorHelper.handleMongooseError(err, res, req);
          else {
            this._removePreviousMedia(uploadPath, fileName, req.authenticatedUser._id + "*").then(() => {
              res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data: user });
            }).catch(err => {
              ErrorHelper.handleError(HTTPCode.error.server.INTERNAL_SERVER_ERROR, 'Oupss', res);
            })
          }
        });
    }).on('error', (error) => {
      ErrorHelper.handleError(HTTPCode.error.server.INTERNAL_SERVER_ERROR, 'Oupss', res);
    });

    form.parse(req);
  }

  private _removePreviousMedia(path, fileName, regExp): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err)
          reject()
        const regex = new RegExp(regExp);
        files.forEach((item) => {
          if (regex.test(item) && item !== fileName)
            fs.unlink(path + item);
        });
        resolve();
      })
    })
  }

}

export default UserRouter;
