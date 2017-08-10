import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { SessionService } from '../../services/session.service';
import { AlertsService } from '@jaspero/ng2-alerts';


// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = `${environment.BASE_URL}/api/emotion/new`;

export interface AlertSettings {
  overlay?: boolean;
  overlayClickToClose?: boolean;
  showCloseButton?: boolean;
  duration?: number;
}

@Component({
  selector: 'app-add-photo-emotion',
  templateUrl: './add-photo-emotion.component.html',
  styleUrls: ['./add-photo-emotion.component.css']
})
export class AddPhotoEmotionComponent implements AlertSettings {
  newImage = { name: '' };
  feedback: string;
  isCompleted: boolean = false;

  public uploader: FileUploader = new FileUploader({ url: URL });

  constructor(public router: Router, public session: SessionService, private _alert: AlertsService) { }

  settings: AlertSettings = {
    overlay : true,
    overlayClickToClose: true,
    showCloseButton: true,
    //duration: 5000
  }

  open() {
      this._alert.create('success' , 'Image Uploaded!', this.settings);
  }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('userRef', this.session.user._id);
    };
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => {
      console.log('uploader Progress:', this.uploader.progress);
      console.log('Uploaded finished!');
      // this.open();
      this.isCompleted = true;
    }
  }

}
