import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { User } from '../../../../_interfaces/user.interface';


@Component({
  selector: 'oe-widget-profil',
  templateUrl: './widget-profil.component.html',
  styleUrls: ['./widget-profil.component.scss']
})
export class WidgetProfilComponent implements OnInit {

  public user:User;

  constructor(private _authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
    this._authenticationService.userChange.subscribe(
        user => this.user = user
    );
  }

}
