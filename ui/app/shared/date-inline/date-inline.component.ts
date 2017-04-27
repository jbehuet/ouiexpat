import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'oe-date-inline',
    templateUrl: './date-inline.component.html',
    styleUrls: ['./date-inline.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateInlineComponent),
            multi: true
        }
    ]
})
export class DateInlineComponent implements OnInit, ControlValueAccessor {

    @Input() label: String;

    public days: Array<Number> = [];
    public months: Array<String> = [];
    public years: Array<Number> = [];

    public _currentDate: Date;


    onChange: any = () => { };
    onTouched: any = () => { };


    get value() {
        return this._currentDate;
    }

    set value(value) {
        this._currentDate = value;
        this.onChange(value);
    }


    constructor() { }

    ngOnInit() {
        const start = new Date().getFullYear();
        this.days = _.range(1, 32);
        this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        this.years = _.range(start, start - 100, -1);
    }

    onDayChange(event) {
        this._currentDate = this._currentDate || new Date();
        this._currentDate.setDate(event);
        this.onChange(this._currentDate);
    }

    onMonthChange(event) {
        this._currentDate = this._currentDate || new Date();
        this._currentDate.setMonth(event);
        this.onChange(this._currentDate);
    }

    onYearChange(event) {
        this._currentDate = this._currentDate || new Date();
        this._currentDate.setFullYear(event);
        this.onChange(this._currentDate);
    }

    writeValue(value) {
        if (value) {
            this._currentDate = new Date(value);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

}
