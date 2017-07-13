import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../_services/statistics.service';
import { ToastHelper } from '../../_helpers/toast.helper';

@Component({
  selector: 'oe-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public statistics:any;

  constructor(private _statisticService: StatisticService) { }

  ngOnInit() {
      this.statistics = this._statisticService.statistics;
      this._load();
  }

  private _load() {
      this._statisticService.getAll().subscribe(statistics => {
          this.statistics = statistics;
      }, (err) => {
          ToastHelper.displayError(err);
      })
  }

}
