import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pickadate } from 'materialize-css';
import { toast } from 'angular2-materialize';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'oe-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    private birthday: Date;
    public displayTerms: Boolean = false;

    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }

    ngOnInit() {

    }

    setBirthday(event) {
        this.birthday = event;
    }

    register(data) {
        data.birthday = this.birthday;
        this._authenticationService.register(data).subscribe(result => {
            this._router.navigate(['/']);
        }, (err) => {
            toast(err, 4000);
        });
    }

}
