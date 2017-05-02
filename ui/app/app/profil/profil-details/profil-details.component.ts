import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastHelper } from '../../../_helpers/toast.helper';

import { User } from '../../../_interfaces/user.interface';

@Component({
    selector: 'oe-profil-details',
    templateUrl: './profil-details.component.html',
    styleUrls: ['./profil-details.component.scss']
})
export class ProfilDetailsComponent implements OnInit {

    public user: User;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = { ...this._authenticationService.user };

        this._authenticationService.userChange.subscribe(
            user => this.user = user
        );
    }

    updateProfil() {
        this.user.address.geometry = this.user.address.geometry || {
            coordinate: [this.user.address.latlng.lat, this.user.address.latlng.lng]
        };

        this._authenticationService.updateProfil(this.user)
            .subscribe(user => {
                ToastHelper.displaySuccess("Updated");
            }, (err) => {
                ToastHelper.displayError(err);
            });
    }
}
