import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
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
            toast(err, 4000);
        });
    }

}
