import { Component, OnInit, Input, Output } from '@angular/core';
import { JobService } from '../../../_services/job.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_interfaces/user.interface';
import { Job } from '../../../_interfaces/job.interface';
import { Expatriation } from '../../../_interfaces/expatriation.interface';
import { ToastHelper } from '../../../_helpers/toast.helper';

@Component({
  selector: 'oe-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  @Input() expatriation: Expatriation;
  private currentUser: User;
  public jobs: Array<Job> = [];

  constructor(private _jobService: JobService,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this._authenticationService.user;
    this.jobs = this._jobService.jobs;
    this._loadJobs();

    this._authenticationService.userChange.subscribe(
      user => this.currentUser = user
    );
  }

  addOrRemoveToFav(job) {
    if (!!this.currentUser.favorites.blogs.find(e => e._id === job._id)) {
      this._jobService.removeFromFavorites(job).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    } else {
      this._jobService.addToFavorites(job).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    }
  }

  isFav(job) {
    return !!this.currentUser.favorites.jobs.find(e => e._id === job._id);
  }

  private _loadJobs() {
    this._jobService.getAll().subscribe(jobs => {
      this.jobs = jobs;
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

}
