import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastHelper } from '../../_helpers/toast.helper';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'oe-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    public displayTerms: Boolean = false;

    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }

    ngOnInit() {

    }

    register(data) {
        this._authenticationService.register(data).subscribe(result => {
            this._router.navigate(['/auth/first']);
        }, (err) => {
            ToastHelper.displayError(err);
        });
    }

}
