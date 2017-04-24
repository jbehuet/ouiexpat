import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'oe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: any;
  @Output() listChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  check(e){
    this.list.items[e.target.name].completed = e.target.checked;
    this.listChange.emit(this.list);
  }

}
