import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_interfaces/user.interface';

@Component({
  selector: 'oe-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public user: User;

  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
  }

}
