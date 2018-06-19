import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {AppUser} from '../models/appUser'
import {ProfileServiceService} from '../profileService/profile-service.service';


const URL = 'http://localhost:51680/api/Upload/user/PostProfileDocumentImage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileServiceService]
})
export class ProfileComponent implements OnInit {
  profile: AppUser

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

  constructor(private profileServiceService: ProfileServiceService) { 
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);        
    }
  }

  uploadFile: any;  

  ngOnInit() {
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        this.profile = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

  onSubmit(appUser: AppUser, form: NgForm) {
    appUser.Activated = false;
    appUser.PersonalDocument = this.url;
    appUser.Id = this.profile.Id;
    this.profileServiceService.putMethodProfile(appUser.Id,appUser)
    .subscribe(
      data => {
        alert("Your changes updated successfully!");
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

  checkIfUploaded(){
    if(this.profile.PersonalDocument == null || this.profile.PersonalDocument == ""){
      return false;
    }
    else{
      return true;
    }
  }

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

}
