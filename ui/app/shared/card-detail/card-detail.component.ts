import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../_interfaces/user.interface';
import {Review} from '../../_interfaces/review.interface';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'oe-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() entity: any;
  @Output() onPostReview: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteReview: EventEmitter<any> = new EventEmitter();
  @Output() onEditReview: EventEmitter<any> = new EventEmitter();
  public currentUser: User;
  public currentReview: Review;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this._authenticationService.user;

    this._authenticationService.userChange.subscribe(
      user => this.currentUser = user
    );
  }

  checkReviewNoWritten(): boolean {
    if (!this.entity) return false
    return !this.entity.reviews.find(r => r.user._id === this.currentUser._id);
  }

  postReview(form: NgForm) {
    this.onPostReview.emit(form.value);
    form.reset();
  }

  deleteReview(review) {
    this.onDeleteReview.emit(review);
  }

  editReview(review) {
    this.onPostReview.emit(review);
  }

}
