import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_interfaces/user.interface';

@Component({
  selector: 'oe-expatriations',
  templateUrl: './expatriations.component.html',
  styleUrls: ['./expatriations.component.scss'],
})
export class ExpatriationsComponent implements OnInit {

  public user:User;

  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
  }

}
