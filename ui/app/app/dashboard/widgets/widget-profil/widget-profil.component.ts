import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';

@Component({
  selector: 'oe-widget-profil',
  templateUrl: './widget-profil.component.html',
  styleUrls: ['./widget-profil.component.scss']
})
export class WidgetProfilComponent implements OnInit {

  public user:any;

  constructor(private _authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
  }

}
