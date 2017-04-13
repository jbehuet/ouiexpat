import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { ToastHelper } from '../../_helpers/toast.helper';

@Component({
    selector: 'oe-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    public token: string;

    constructor(private _route: ActivatedRoute, private _authenticationService: AuthenticationService,
        private _router: Router) { }

    ngOnInit() {
        this._route.paramMap.subscribe((params: ParamMap) => {
            this.token = params.get('token');
        });
    }

    requestLink(data) {
        this._authenticationService.requestResetPassword(data)
            .subscribe(() => {
                ToastHelper.displaySuccess("Un email vous a été envoyer à l'adresse : " + data.email);
            }, (err) => {
                ToastHelper.displayError(err);
            });
    }

    reset(data){
      this._authenticationService.resetPassword(this.token, data)
          .subscribe(() => {
              ToastHelper.displaySuccess("Votre mot de passe a bien été modifié !");
              this._router.navigate(['/auth/login']);
          }, (err) => {
              ToastHelper.displayError(err);
          });
    }

}
