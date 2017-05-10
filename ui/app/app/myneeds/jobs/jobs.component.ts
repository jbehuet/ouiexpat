import { Component, OnInit, Input, Output } from '@angular/core';
import { Expatriation } from '../../../_interfaces/expatriation.interface';

@Component({
  selector: 'oe-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  @Input() expatriation: Expatriation;

  constructor() { }

  ngOnInit() {
  }

}
