import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastHelper } from '../../../_helpers/toast.helper';

import { User } from '../../../_interfaces/user.interface';


@Component({
    selector: 'oe-profil-password',
    templateUrl: './profil-password.component.html',
    styleUrls: ['./profil-password.component.scss']
})
export class ProfilPasswordComponent implements OnInit {

    public user: User;
    public confirmation: String;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = { ...this._authenticationService.user };

        this._authenticationService.userChange.subscribe(
            user => this.user = user
        );
    }

    updatePassword() {
        if (this.user.password != this.confirmation) {
            ToastHelper.displayWarning('Password and confirmation not match !');
        } else {
            this._authenticationService.updateProfil(this.user)
                .subscribe(user => {
                    ToastHelper.displaySuccess("Updated");
                }, (err) => {
                    ToastHelper.displayError(err);
                });
        }
    }

}
