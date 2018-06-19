import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {AppUser} from '../models/appUser'
import {ProfileServiceService} from '../profileService/profile-service.service';

const URL = 'http://localhost:51680/api/Upload/user/PostBranchImage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileServiceService]
})
export class ProfileComponent implements OnInit {
  profile: AppUser

  constructor(private profileServiceService: ProfileServiceService) { }

  ngOnInit() {
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        this.profile = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  onSubmit(appUser: AppUser, form: NgForm) {
    //branch.Logo = this.url;
    appUser.Id = this.profile.Id;
    this.profileServiceService.putMethodProfile(appUser.Id,appUser)
    .subscribe(
      data => {
        alert("Your changes updated successfully!");
        form.reset();
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

}
