import { Component, OnInit, Input } from '@angular/core';
import { AssociationService } from '../../../_services/association.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_interfaces/user.interface';
import { Association } from '../../../_interfaces/association.interface';
import { ToastHelper } from '../../../_helpers/toast.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'oe-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss']
})
export class AssociationsComponent implements OnInit {

  @Input() expatriation: any;
  private currentUser: User;
  public associations: Array<Association> = [];


  constructor(private _associationService: AssociationService,
    private _authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this._authenticationService.user;
    this.associations = this._associationService.associations;
    this._loadBlogs();

    this._authenticationService.userChange.subscribe(
      user => this.currentUser = user
    );
  }

  addOrRemoveToFav(association) {
    if (!!this.currentUser.favorites.blogs.find(e => e === association._id)) {
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

  isFav(association) {
    return !!this.currentUser.favorites.associations.find(e => e._id === association._id);
  }

  isLiked(association) {
    return !!association.likes.find(e => e === this.currentUser._id);
  }

  likeOrDislike(association) {
    if (!!association.likes.find(e => e === this.currentUser._id)) {
      this._associationService.dislike(association).subscribe(associations => {
        this.associations = associations;
      }, (err) => {
        ToastHelper.displayError(err);
      })
    } else {
      this._associationService.like(association).subscribe(associations => {
        this.associations = associations;
      }, (err) => {
        ToastHelper.displayError(err);
      })
    }
  }

  seeDetail(association) {
    this.router.navigate(['happyexpat', 'association', 'detail', association._id])
  }

  private _loadBlogs() {
    this._associationService.getAll().subscribe(associations => {
      this.associations = associations;
    }, (err) => {
      ToastHelper.displayError(err);
    })
  }

}
