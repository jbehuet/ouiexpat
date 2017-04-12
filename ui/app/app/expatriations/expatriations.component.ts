import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_interfaces/user.interface';

@Component({
    selector: 'oe-expatriations',
    templateUrl: './expatriations.component.html',
    styleUrls: ['./expatriations.component.scss'],
})
export class ExpatriationsComponent implements OnInit {

    public user: User;
    public currentExpat: any;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this._authenticationService.user;
        this.currentExpat = this.user.expeditions.reduce((prev, current) => {
            return (new Date(prev.date) > new Date(current.date)) ? prev : current
        });
    }

}
