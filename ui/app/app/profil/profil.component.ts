import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { toast } from 'angular2-materialize';

import { User } from '../../_interfaces/user.interface';

@Component({
    selector: 'oe-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

    public user: User;

    constructor(private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = this._authenticationService.user;
    }

    onDateChange(date) {
        this.user.birthday = date;
    }

    updateProfil() {
        this._authenticationService.updateProfil(this.user)
            .subscribe(user => {
                toast("Updated", 4000);
            }, (err) => {
                toast(err, 4000);
            });
    }

}
