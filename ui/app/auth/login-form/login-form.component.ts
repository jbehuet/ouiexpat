import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { AuthenticationService } from '../../_services/authentication.service';

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
            .subscribe(user => {
                if (user.expeditions.length === 0) {
                    this._router.navigate(['/auth/first']);
                } else {
                    this._router.navigate(['/']);
                }
            }, (err) => {
                toast(err, 4000);
            });
    }

}
