import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'oe-checklists',
    templateUrl: './checklists.component.html',
    styleUrls: ['./checklists.component.scss']
})
export class ChecklistsComponent implements OnInit {

    @Input() expatriation: any = [];
    @Input() empty: boolean = false;

    constructor() { }

    ngOnInit() {
      console.log(this.expatriation)

    }

    onListChange() {

    }



}
