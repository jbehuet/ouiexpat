import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { StatisticService } from '../_services/statistics.service';
import { User } from '../_interfaces/user.interface';

import { ToastHelper } from '../_helpers/toast.helper';

@Component({
  selector: 'oe-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public user: User;
  public statistics: any;

  constructor(
    private _authenticationService:AuthenticationService,
    private _statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.user = this._authenticationService.user;
    this._authenticationService.userChange.subscribe(
        user => this.user = user
    );

this.statistics = this._statisticService.statistics;
      this._statisticService.getAll().subscribe(statistics => {
          this.statistics = statistics;
      }, (err) => {
          ToastHelper.displayError(err);
      })

  }

}
