import { Component, OnInit } from '@angular/core';
import { Pickadate } from 'materialize-css';

@Component({
  selector: 'oe-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  private formDateOptions:Pickadate.DateOptions;

  constructor() { }

  ngOnInit() {
    this.formDateOptions = this.getDefaultPickaDateOptions();
  }

  private getDefaultPickaDateOptions(): Pickadate.DateOptions {
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
      format: 'dd/mm/yyyy',
      max: new Date().toISOString()
    };
  }

}
