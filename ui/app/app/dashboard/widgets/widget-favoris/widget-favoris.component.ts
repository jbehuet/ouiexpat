import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { User } from '../../../../_interfaces/user.interface';

@Component({
  selector: 'oe-widget-favoris',
  templateUrl: './widget-favoris.component.html',
  styleUrls: ['./widget-favoris.component.scss']
})
export class WidgetFavorisComponent implements OnInit {

  public user:User;

  constructor(private _authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
    this._authenticationService.userChange.subscribe(
        user => this.user = user
    );
  }

  isEmpty(): Boolean {
    if (!this.user) return true;
    return (this.user.favorites.associations.length === 0 && this.user.favorites.blogs.length === 0 && this.user.favorites.jobs.length === 0)
  }

}
