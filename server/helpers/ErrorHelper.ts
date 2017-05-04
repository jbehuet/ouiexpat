import * as mongoose from 'mongoose';
import {Router, Request, Response, NextFunction} from 'express';
import IRequest from '../interfaces/IRequest';
import HTTPCode from '../constants/HttpCodeConstant';
import { ErrorMessages } from '../constants/ErrorMessagesConstant';
import RollbarHelper from './RollbarHelper';

class ErrorHelper {

  public static handleMongooseError(error: mongoose.Error, res: Response, req: Request) {
    let status = HTTPCode.error.server.INTERNAL_SERVER_ERROR;
    if (error.code === 11000) {
      //DUPLICATE KEY
      status = HTTPCode.error.client.CONFLICT;
    }
    console.log(error)
    RollbarHelper.getInstance().reportError(error.message, req);
    res.status(status).json({ status, message: error.message, errors: error.errors });
  }


  public static handleError(status: number, message: string, res: Response, req?: IRequest) {
    if (req) {
      let language = req.acceptsLanguages()[0];

      if (!ErrorMessages.hasOwnProperty(language))
        language = "default"

      res.status(status).json({ status, message : ErrorMessages[language][message] });
    } else {
      res.status(status).json({ status, message });
    }
  }

}

export default ErrorHelper
