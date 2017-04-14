import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ExpatriationService } from '../../../../_services/expatriation.service';
import { ToastHelper } from '../../../../_helpers/toast.helper';
import { User } from '../../../../_interfaces/user.interface';

@Component({
    selector: 'oe-widget-expatriations',
    templateUrl: './widget-expatriations.component.html',
    styleUrls: ['./widget-expatriations.component.scss']
})
export class WidgetExpatriationsComponent implements OnInit {

    public user: User;
    public expatriations: any;
    public expatSelected: any;

    constructor(private _authenticationService: AuthenticationService,
        private _expatriationService: ExpatriationService) { }

    ngOnInit() {
        this.user = this._authenticationService.user;
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

    getDayDiff(): number {
        if (!this.expatSelected) return;
        const now = new Date();
        const expatSelectedDate = new Date(this.expatSelected.date);
        if (expatSelectedDate.getTime() > now.getTime()) {
            const timeDiff = Math.abs(expatSelectedDate.getTime() - now.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return diffDays;
        } else {
            return -1
        }
    }

}
