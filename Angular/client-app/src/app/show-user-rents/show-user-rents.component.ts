import { Component, OnInit } from '@angular/core';
import {ProfileServiceService} from '../profileService/profile-service.service';
import {AppUser} from '../models/appUser'
import { Rent } from 'src/app/models/rent';
import { RentServiceService } from '../rent-service/rent-service.service';

@Component({
  selector: 'app-show-user-rents',
  templateUrl: './show-user-rents.component.html',
  styleUrls: ['./show-user-rents.component.css']
})
export class ShowUserRentsComponent implements OnInit {
  buttonStart: Date
  start: Date;
  end: Date;
  today: Date;
  rents: Rent[];
  pomList: Rent[]=[];
  appUser: AppUser;

  constructor(private profileServiceService: ProfileServiceService, private rentServiceService: RentServiceService) { }

  ngOnInit() {
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        debugger
        this.appUser = data;
        this.rents = this.appUser.Rents;

        this.checkRentForDelete();

        this.rents = [];

        this.rents = this.pomList;
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
      
  }

  checkButton(rent: Rent){
    debugger
    this.today = new Date();
    this.buttonStart = new Date(rent.Start)
    if(this.buttonStart < this.today){
      return true;
    }
    else{
      return false;
    }
  }

  deleteRent(Id : number){
    this.rentServiceService.deleteMethodRent(Id).
    subscribe(
      data => {
        this.rents = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

  checkRentForDelete(){
    debugger
    this.today = new Date();
    for(var it = 0; it < this.rents.length; it++){
      this.end = new Date(this.rents[it].End);
      if(this.today > this.end){
        this.rentServiceService.deleteMethodRent(this.rents[it].Id).
        subscribe(
          data => {
          },
          error => {
            alert(error.error.ModelState[""][0])
          });
      }
      else{
        this.pomList.push(this.rents[it]);
      }
    }
  }
}
