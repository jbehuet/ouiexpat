import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { User } from '../../../../_interfaces/user.interface';

@Component({
    selector: 'oe-widget-expatriations',
    templateUrl: './widget-expatriations.component.html',
    styleUrls: ['./widget-expatriations.component.scss']
})
export class WidgetExpatriationsComponent implements OnInit {

    public user: User;
    public expatSelected: any;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this._authenticationService.user;
        this.expatSelected = (this.user.expeditions.length > 0 ? this.user.expeditions[0] : null);
    }

    getDayDiff(): number {
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
