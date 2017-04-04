import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'oe-date-inline',
    templateUrl: './date-inline.component.html',
    styleUrls: ['./date-inline.component.scss'],
})
export class DateInlineComponent implements OnInit {

    @Input() label: String;
    @Input() date: Date;
    @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

    public days: Array<Number> = [];
    public months: Array<String> = [];
    public years: Array<Number> = [];

    private currentDate: Date = new Date();

    constructor() { }

    ngOnInit() {
        const start = new Date().getFullYear();
        this.days = _.range(1, 32);
        this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        this.years = _.range(start, start - 100, -1);
    }

    onDayChange(event) {
        this.currentDate.setDate(event);
        this.onDateChange.emit(this.currentDate);
    }

    onMonthChange(event) {
        this.currentDate.setMonth(event);
        this.onDateChange.emit(this.currentDate);
    }

    onYearChange(event) {
        this.currentDate.setFullYear(event);
        this.onDateChange.emit(this.currentDate);
    }


}
