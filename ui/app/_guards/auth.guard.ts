import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

    canActivate() {
        if (this._authenticationService.checkValidSession()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this._router.navigate(['/auth/login']);
        return false;
    }
}
