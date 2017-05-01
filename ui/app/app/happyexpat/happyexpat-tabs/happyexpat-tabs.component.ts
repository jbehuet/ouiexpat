import { Component, OnInit } from '@angular/core';
import {ExpatriationService} from '../../../_services/expatriation.service';
import {ToastHelper} from '../../../_helpers/toast.helper';

@Component({
  selector: 'oe-happyexpat-tabs',
  templateUrl: './happyexpat-tabs.component.html',
  styleUrls: ['./happyexpat-tabs.component.scss']
})
export class HappyexpatTabsComponent implements OnInit {

  public expatriations: any = [];
  public expatSelected: any;

  constructor(private _expatriationService: ExpatriationService) { }

  ngOnInit() {
    this.expatriations = this._expatriationService.expatriations;
    this._loadExpatriations();
  }

  onListChange() {
    this._expatriationService.update(this.expatSelected)
        .subscribe(expatriations => {
          //NO MESSAGE
        }, (err) => {
          ToastHelper.displayError(err);
        });
  }

  private _loadExpatriations() {
    this._expatriationService.getAll().subscribe(expatriations => {
      this.expatriations = expatriations;
      const filtred = this.expatriations.filter(v => new Date(v.date) > new Date());
      if (filtred.length > 0) {
        this.expatSelected = filtred.reduce((prev, current) => {
          return (new Date(current.date) < new Date(prev.date)) ? current : prev
        });
      } else if (this.expatriations.length > 0) {
        this.expatSelected = this.expatriations[0]
      }
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

}
