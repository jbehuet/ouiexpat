import { Component, OnInit } from '@angular/core';
import { ExpatriationService } from '../../_services/expatriation.service';
import { ToastHelper } from '../../_helpers/toast.helper';
import { User } from '../../_interfaces/user.interface';

@Component({
    selector: 'oe-expatriations',
    templateUrl: './expatriations.component.html',
    styleUrls: ['./expatriations.component.scss'],
})
export class ExpatriationsComponent implements OnInit {

    public expatriations: any = [];
    public currentExpat: any;

    constructor(private _expatriationService: ExpatriationService) { }

    ngOnInit() {
        this._loadExpatriations();
    }

    private _loadExpatriations() {
        this._expatriationService.getAll().subscribe(expatriations => {
            this.expatriations = expatriations;
            this.currentExpat = this.expatriations.reduce((prev, current) => {
                return (new Date(prev.date) > new Date(current.date)) ? prev : current
            });
        }, (err) => {
            ToastHelper.displayError(err);
        })
    }

}
