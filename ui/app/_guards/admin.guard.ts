import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

    canActivate() {
      if (this._authenticationService.user.administrator)
      return true

      this._router.navigate(['/']);
      return false;
    }
}
