import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastHelper } from '../../../_helpers/toast.helper';

import { User } from '../../../_interfaces/user.interface';

@Component({
  selector: 'oe-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.scss']
})
export class ProfilDetailsComponent implements OnInit {

  public uploader: FileUploader;
  public user: User;
  public token: String;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = { ...this._authenticationService.user };

    this.uploader = new FileUploader({ url: '/api/v1/users/media', authToken: this._authenticationService.token });

    this._authenticationService.userChange.subscribe(
      user => this.user = user
    );
  }

  updateProfil(toast = true) {
    this.user.address.geometry = this.user.address.geometry || {
      coordinate: [this.user.address.latlng.lat, this.user.address.latlng.lng]
    };

    this._authenticationService.updateProfil(this.user)
      .subscribe(user => {
        if (toast)
          ToastHelper.displaySuccess("Updated");
      }, (err) => {
        ToastHelper.displayError(err);
      });
  }

  deleteImage() {
    this.user.photo = '/assets/img/no-avatar.png'
    this.updateProfil(false);
  }

  fileChange(e) {
    this.uploader.uploadAll()
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      res = JSON.parse(res);
      this._authenticationService.user = res.data;
      this._authenticationService.userChange.emit(res.data);
    };
  }


}
