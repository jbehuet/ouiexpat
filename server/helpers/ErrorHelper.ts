import * as mongoose from 'mongoose';
import {Router, Request, Response, NextFunction} from 'express';
import HTTPCode from '../constants/HttpCodeConstant';

class ErrorHelper {

  public static handleMongooseError(error: mongoose.Error, res: Response) {
      let status = HTTPCode.error.server.INTERNAL_SERVER_ERROR;
      if (error.code === 11000){
        //DUPLICATE KEY
        status = HTTPCode.error.client.CONFLICT;
      }
      res.status(status).json({status, message: error.message, errors: error.errors});
  }

  public static handleError(status: number, message: string, res: Response) {
      res.status(status).json({ status, message });
  }

}

export default ErrorHelper