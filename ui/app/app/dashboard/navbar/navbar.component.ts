import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'oe-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user:any = null;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
  }

}
