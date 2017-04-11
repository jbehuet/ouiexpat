import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_interfaces/user.interface';


@Component({
    selector: 'oe-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public user: User = null;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this._authenticationService.user;
        this._authenticationService.userChange.subscribe(
            user => this.user = user
        );
    }

}
