import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'date-inline',
    templateUrl: './date-inline.component.html',
    styleUrls: ['./date-inline.component.scss'],
})
export class DateInlineComponent implements OnInit {

    @Input() label: String;
    @Input() date: Date;
    @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

    private days: Array<Number> = [];
    private months: Array<String> = [];
    private years: Array<Number> = [];

    private currentDate: Date = new Date();

    constructor() { }

    ngOnInit() {
        this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

        let start = new Date().getFullYear();
        let end = start - 100;
        for (let year = start; year > end; year--) {
            this.years.push(year);
        }
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
