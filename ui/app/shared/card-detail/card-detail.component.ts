import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_interfaces/user.interface';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'oe-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() entity: any;
    private currentUser: User;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.currentUser = this._authenticationService.user;
  }

}
