import { Component, OnInit } from '@angular/core';
import { Pickadate } from 'materialize-css';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'oe-first-expat-form',
    templateUrl: './first-expat-form.component.html',
    styleUrls: ['./first-expat-form.component.scss']
})
export class FirstExpatFormComponent implements OnInit {

    public formDateOptions: Pickadate.DateOptions;
    public expatriation: any = {};


    constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.formDateOptions = this._getDefaultPickaDateOptions();
    }

    register() {
        const _expatriation = {
          location: {
              address: this.expatriation.location.value,
              city: this.expatriation.location.city || this.expatriation.location.name,
              postcode: this.expatriation.location.postcode || '',
              country: this.expatriation.location.country,
              countryCode: this.expatriation.location.countryCode,
              geometry: {
                  coordinate: [this.expatriation.location.latlng.lat, this.expatriation.location.latlng.lng]
              }
          },
          date: this.expatriation.date
        }

        this._authenticationService.createExpatriation(_expatriation).subscribe(result => {
            this._router.navigate(['/dashboard']);
        }, (err) => {
            toast(err, 4000);
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
            format: 'dd/mm/yyyy'
        };
    }

}
