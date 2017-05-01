import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oe-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() entity: any;

  constructor() { }

  ngOnInit() {
  }

}
