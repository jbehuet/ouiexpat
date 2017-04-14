import { Component, OnInit } from '@angular/core';
import { Pickadate } from 'materialize-css';
import { Router } from '@angular/router';
import { ToastHelper } from '../../_helpers/toast.helper';
import { ExpatriationService } from '../../_services/expatriation.service';

@Component({
    selector: 'oe-first-expat-form',
    templateUrl: './first-expat-form.component.html',
    styleUrls: ['./first-expat-form.component.scss']
})
export class FirstExpatFormComponent implements OnInit {

    public formDateOptions: Pickadate.DateOptions;
    public expatriation: any = {};


    constructor(private _router: Router, private _expatriationService: ExpatriationService) { }

    ngOnInit() {
        this.formDateOptions = this._getDefaultPickaDateOptions();
    }

    register() {
        this.expatriation.location.geometry = {
            coordinate: [this.expatriation.location.latlng.lat, this.expatriation.location.latlng.lng]
        };

        this._expatriationService.createExpatriation(this.expatriation).subscribe(result => {
            this._router.navigate(['/dashboard']);
        }, (err) => {
            ToastHelper.displayError(err);
        });

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
            format: 'yyyy-mm-dd'
        };
    }

}
