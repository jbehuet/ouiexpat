import { Component, OnInit } from '@angular/core';
import { Pickadate } from 'materialize-css';
import { ExpatriationService } from '../../_services/expatriation.service';
import { ToastHelper } from '../../_helpers/toast.helper';
import { User } from '../../_interfaces/user.interface';

@Component({
    selector: 'oe-expatriations',
    templateUrl: './expatriations.component.html',
    styleUrls: ['./expatriations.component.scss'],
})
export class ExpatriationsComponent implements OnInit {

    public formDateOptions: Pickadate.DateOptions;
    public expatriations: any = [];
    public currentExpat: any = {};

    constructor(private _expatriationService: ExpatriationService) { }

    ngOnInit() {
        this._loadExpatriations();
        this.formDateOptions = this._getDefaultPickaDateOptions();
    }

    delete() {
        this._expatriationService.delete(this.currentExpat)
            .subscribe(expatriations => {
                ToastHelper.displaySuccess("Deleted");
            }, (err) => {
                ToastHelper.displayError(err);
            });
    }

    update() {
        this._expatriationService.update(this.currentExpat)
            .subscribe(expatriations => {
                ToastHelper.displaySuccess("Updated");
            }, (err) => {
                ToastHelper.displayError(err);
            });
    }

    private _loadExpatriations() {
        this._expatriationService.getAll().subscribe(expatriations => {
            this.expatriations = expatriations;
            const filtred = this.expatriations.filter(v => new Date(v.date) > new Date());
            if (filtred.length > 0) {
                this.currentExpat = filtred.reduce((prev, current) => {
                    return (new Date(current.date) < new Date(prev.date)) ? current : prev
                });
            }
        }, (err) => {
            ToastHelper.displayError(err);
        })
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
