import { Component, OnInit } from '@angular/core';
import { Pickadate } from 'materialize-css';

@Component({
    selector: 'oe-first-expat-form',
    templateUrl: './first-expat-form.component.html',
    styleUrls: ['./first-expat-form.component.scss']
})
export class FirstExpatFormComponent implements OnInit {

    public formDateOptions: Pickadate.DateOptions;

    constructor() { }

    ngOnInit() {
        this.formDateOptions = this._getDefaultPickaDateOptions();
    }

    private _getDefaultPickaDateOptions(): Pickadate.DateOptions {
        return {
            selectMonths: true,
            selectYears: 100,
            monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            firstDay: 1,
            today: 'AUJ.',
            clear: 'SUPP.',
            close: 'OK',
            format: 'dd/mm/yyyy'
        };
    }

}
