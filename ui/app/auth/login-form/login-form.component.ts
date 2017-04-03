import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
    selector: 'oe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService,
                private router:Router) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login(data) {
        this.authenticationService.login(data.email, data.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    //ERROR
                }
            });
    }

}
