import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { ToastHelper } from '../../_helpers/toast.helper';

import { User } from '../../_interfaces/user.interface';

@Component({
    selector: 'oe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }

    ngOnInit() {
        // reset login status
        this._authenticationService.logout();
    }

    login(data) {
        this._authenticationService.login(data.email, data.password)
            .subscribe((user:User) => {
                if (user.expeditions.length === 0) {
                    this._router.navigate(['/auth/first']);
                } else {
                    this._router.navigate(['/']);
                    ToastHelper.displayInfo("Bonjour " + user.lastname + ' ' + user.firstname);
                }
            }, (err) => {
                ToastHelper.displayError(err);
            });
    }

}
