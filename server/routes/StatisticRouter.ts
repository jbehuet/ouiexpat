import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Router, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';

import IRequest from '../interfaces/IRequest';
import ErrorHelper from '../helpers/ErrorHelper';
import AbstractRouter from './AbstractRouter';

import UserFormat from '../formats/UserFormat';
import UserModel from '../models/UserModel';

import ExpatriationModel from '../models/ExpatriationModel';
import ExpatriationFormat from '../formats/ExpatriationFormat';

class StatisticRouter extends AbstractRouter {

  constructor() {
    super(null)
    this.router.get('/', this.getStatistics.bind(this));
  }

  protected getStatistics(req: IRequest, res: Response, next: NextFunction) {

    if (!req.authenticatedUser.administrator) return ErrorHelper.handleError(HTTPCode.error.client.UNAUTHORIZED, 'Not authorize', res);

    const now = new Date(), y = now.getFullYear(), m = now.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    ExpatriationModel.find({}).sort({ createdAt: "desc" }).populate('owner').exec((err: mongoose.Error, expatriations: Array<ExpatriationFormat>) => {

      if (err) ErrorHelper.handleMongooseError(err, res, req);
      else {

        UserModel.find({}).sort({ createdAt: "desc" }).exec((err: mongoose.Error, users: Array<UserFormat>) => {

          if (err) ErrorHelper.handleMongooseError(err, res, req);
          else {
            
            const data = {
              users: {
                count: {
                  total: users.length,
                  month: users.filter(user => user.createdAt >= firstDay && user.createdAt <= lastDay).length
                },
                last: users[0]
              },
              expatriations: {
                count: {
                  total: expatriations.length,
                  month: expatriations.filter(expatriation => expatriation.createdAt >= firstDay && expatriation.createdAt <= lastDay).length
                },
                last: expatriations[0]
              }
            };

            res.status(HTTPCode.success.OK).json({ status: HTTPCode.success.OK, data });
          }

        })
      }
    })
  }

}

export default StatisticRouter;
