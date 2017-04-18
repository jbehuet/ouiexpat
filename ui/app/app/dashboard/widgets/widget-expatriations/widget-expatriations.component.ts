import { Component, OnInit } from '@angular/core';
import { ExpatriationService } from '../../../../_services/expatriation.service';
import { ToastHelper } from '../../../../_helpers/toast.helper';

@Component({
    selector: 'oe-widget-expatriations',
    templateUrl: './widget-expatriations.component.html',
    styleUrls: ['./widget-expatriations.component.scss']
})
export class WidgetExpatriationsComponent implements OnInit {

    public expatriations: any;
    public expatSelected: any;

    constructor(private _expatriationService: ExpatriationService) { }

    ngOnInit() {
        this.expatriations = this._expatriationService.expatriations;
        this._loadExpatriations();
    }

    private _loadExpatriations() {
        this._expatriationService.getAll().subscribe(expatriations => {
            this.expatriations = expatriations.filter(v => new Date(v.date) > new Date());

            if (this.expatriations.length > 0) {
                this.expatSelected = this.expatriations.reduce((prev, current) => {
                    return (new Date(current.date) < new Date(prev.date)) ? current : prev
                });
            }

        }, (err) => {
            ToastHelper.displayError(err);
        })
    }

}
