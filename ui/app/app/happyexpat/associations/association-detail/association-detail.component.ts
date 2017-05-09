import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssociationService } from '../../../../_services/association.service';
import { Association } from '../../../../_interfaces/association.interface';
import { User } from '../../../../_interfaces/user.interface';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ToastHelper } from '../../../../_helpers/toast.helper';
import * as _ from 'lodash';

@Component({
  selector: 'oe-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.scss']
})
export class AssociationDetailComponent implements OnInit {

  public association: Association;
  private currentUser: User;

  constructor(private _route: ActivatedRoute,
    private _associationService: AssociationService,
    private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser = this._authenticationService.user;
    this._route.paramMap
      .map(map => map.get('id'))
      .switchMap(id => this._associationService.getById(id))
      .subscribe(association => this.association = association);

    this._authenticationService.userChange.subscribe(
      user => this.currentUser = user
    );
  }

  addOrRemoveToFav(association) {
    if (!!this.currentUser.favorites.associations.find(e => e._id === association._id)) {
      this._associationService.removeFromFavorites(association).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    } else {
      this._associationService.addToFavorites(association).subscribe(success => {

      }, (err) => {
        ToastHelper.displayError(err);
      })
    }
  }

  isFav() {
    if (!this.association) return false
    return !!this.currentUser.favorites.associations.find(e => e._id === this.association._id);
  }

  isLiked() {
    if (!this.association) return false
    return !!this.association.likes.find(e => e === this.currentUser._id);
  }

  likeOrDislike(association) {
    if (!association) return false
    if (!!association.likes.find(e => e === this.currentUser._id)) {
      this._associationService.dislike(association).subscribe(() => {
        _.remove(association.likes, (like) => {
          return like === this.currentUser._id
        });
      }, (err) => {
        ToastHelper.displayError(err);
      })
    } else {
      this._associationService.like(association).subscribe(() => {
        association.likes.push(this.currentUser._id);
      }, (err) => {
        ToastHelper.displayError(err);
      })
    }
  }

  visit(association) {
    if (!association) return false
    if (!(/^https?:\/\//).test(association.link))
      association.link = 'http://' + association.link
    window.open(association.link);
  }

  postReview(review){
    this._associationService.postReview(this.association, review).subscribe(blog => {
      this.association = blog;
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

  deleteReview(review){
    this._associationService.deleteReview(this.association, review).subscribe(blog => {
      this.association = blog;
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

}
