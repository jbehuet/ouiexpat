import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oe-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss']
})
export class AssociationsComponent implements OnInit {

  @Input() expatriation: any;

  constructor() { }

  ngOnInit() {

  }

}
