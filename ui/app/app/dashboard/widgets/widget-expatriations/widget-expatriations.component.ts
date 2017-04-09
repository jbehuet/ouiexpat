import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';

@Component({
  selector: 'oe-widget-expatriations',
  templateUrl: './widget-expatriations.component.html',
  styleUrls: ['./widget-expatriations.component.scss']
})
export class WidgetExpatriationsComponent implements OnInit {

  public user:any;

  constructor(private _authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
  }

}
