import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastHelper } from '../../../_helpers/toast.helper';

import { User } from '../../../_interfaces/user.interface';

@Component({
  selector: 'oe-profil-details',
  templateUrl: './profil-details.component.html',
  styleUrls: ['./profil-details.component.scss']
})
export class ProfilDetailsComponent implements OnInit {

  public user: User;
  public token: String;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = { ...this._authenticationService.user };
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

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        const file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        this._authenticationService.uploadMedia(this.user._id, formData)
        .subscribe((user) => {
            //OK
        }, (err) => {
          ToastHelper.displayError(err);
        });
    }
  }


}
