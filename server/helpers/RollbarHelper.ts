import * as rollbar from 'rollbar';
import { Request } from 'express';
import CONFIG from '../config';

class RollbarHelper {

    private static _instance: RollbarHelper = new RollbarHelper();

    constructor() {
        console.log('Init Rollbar : ' + CONFIG.rollbar);
        rollbar.init(CONFIG.rollbar, { environment: process.env.NODE_ENV });
    }

    public static getInstance(): RollbarHelper {
        return RollbarHelper._instance;
    }

    public reportCritical(message: string, request: Request, callback?: void) {
        this._reportMessage(message, 'critical', request, callback);
    }

    public reportError(message: string, request: Request, callback?: void) {
        this._reportMessage(message, 'error', request, callback);
    }

    public reportWarning(message: string, request: Request, callback?: void) {
        this._reportMessage(message, 'warning', request, callback);
    }

    public reportInfo(message: string, request: Request, callback?: void) {
        this._reportMessage(message, 'info', request, callback);
    }

    public reportDebug(message: string, request: Request, callback?: void) {
        this._reportMessage(message, 'debug', request, callback);
    }

    private _reportMessage(message: string, level: string, request: Request, callback?: void) {
        rollbar.reportMessage(message, level, request, callback);
    }

}

export default RollbarHelper
