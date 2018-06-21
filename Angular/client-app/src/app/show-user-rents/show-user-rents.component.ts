import { Component, OnInit } from '@angular/core';
import {ProfileServiceService} from '../profileService/profile-service.service';
import {AppUser} from '../models/appUser'
import { Rent } from 'src/app/models/rent';

@Component({
  selector: 'app-show-user-rents',
  templateUrl: './show-user-rents.component.html',
  styleUrls: ['./show-user-rents.component.css']
})
export class ShowUserRentsComponent implements OnInit {
  rents: Rent[];
  appUser: AppUser;

  constructor(private profileServiceService: ProfileServiceService) { }

  ngOnInit() {
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        this.appUser = data;
        this.rents = this.appUser.Rents;
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
      
  }

}
