import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'oe-checklists',
    templateUrl: './checklists.component.html',
    styleUrls: ['./checklists.component.scss']
})
export class ChecklistsComponent implements OnInit {

    @Input() expatriation: any = [];
    @Input() empty: boolean = false;

    @Output() listChange: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onListChange() {
      this.listChange.emit(this.expatriation);
    }



}
