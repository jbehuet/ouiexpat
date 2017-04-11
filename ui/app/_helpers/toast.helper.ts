import { toast } from 'angular2-materialize';

export class ToastHelper {

    private static _defaultDuration: number = 4000;

    constructor() { }


    public static displayError(message: string, duration: number = this._defaultDuration) {
        toast(message, duration, 'red');
    }

    public static displayWarning(message: string, duration: number = this._defaultDuration) {
        toast(message, duration, 'orange');
    }

    public static displayInfo(message: string, duration: number = this._defaultDuration) {
        toast(message, duration, 'blue');
    }

    public static displaySuccess(message: string, duration: number = this._defaultDuration) {
        toast(message, duration, 'green');
    }

}
