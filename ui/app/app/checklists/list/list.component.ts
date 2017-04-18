import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: any;

  constructor() { }

  ngOnInit() {
  }

}
