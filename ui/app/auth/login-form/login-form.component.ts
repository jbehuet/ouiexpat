import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeDirective, MaterializeAction, toast } from 'angular2-materialize';
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
              this.router.navigate(['/']);
            }, (err) => {
              toast(err, 4000);
            });
    }

}
