import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { BranchServiceService } from 'src/app/branchService/branch-service.service';
import { Branch } from 'src/app/models/branch';
import { VehicleServiceService } from 'src/app/vehicle-Service/vehicle-service.service';
import { Vehicle } from 'src/app/models/vehicle';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { Rent } from 'src/app/models/rent';
import { NgForm } from '@angular/forms';
import { RentServiceService } from 'src/app/rent-service/rent-service.service';
import {AppUser} from '../models/appUser'
import {ProfileServiceService} from '../profileService/profile-service.service';
import { Http } from '@angular/http/src/http';
import { MapInfo } from '../map/map-info.model';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'] //postavljamo sirinu i visinu mape
})
export class RentComponent implements OnInit {
  branchToRet: string;
  branchToSend: string;
  mapInfo: any;
  someDate: Date;
  someDate2: Date;
  today: Date;
  Id: number = -1;
  service: Service;
  branchesTemp: Branch[];
  branches: Branch[];
  vehicle: Vehicle;
  services: Service[];
  branchMarker: any;
appUser: AppUser;
startDay: any;
endDay: any;
difference: number;
pricePH: number;

public payPalConfig?: PayPalConfig;

  constructor(private router: Router,private profileServiceService: ProfileServiceService,private rentServiceService: RentServiceService, private serviceServiceService: ServiceServiceService, private activatedRoute: ActivatedRoute, private branchServiceService: BranchServiceService, private vehicleServiceService: VehicleServiceService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
    this.mapInfo = new MapInfo(45.242268, 19.842954, 
      "assets/ftn.png",
      "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
   }
  
  ngOnInit() {
    this.serviceServiceService.getMethodService()
    .subscribe(
      data => {
        debugger
        this.services = data;

        this.vehicleServiceService.getMethodVehicleById(this.Id)
        .subscribe(
          data => {
            this.vehicle = data;
            this.pricePH = this.vehicle.PricePerHour;

            for(var i = 0; i<this.services.length; i++ )
            {
              for(var ii = 0; ii<this.services[i].Vehicles.length; ii++ )
              {
                if(this.services[i].Vehicles[ii].Id == this.vehicle.Id)
                {
                  this.branches = this.services[i].Branches;
  
                }
              }
            }
            
          },
          error => {
            alert(error.error.ModelState[""][0])
          })    
  
      },
      error => {
        alert(error.error.ModelState[""][0])
      }) 

  }

  payWithPayPal(){
    debugger
    this.startDay = document.getElementsByName("Start")[0];
    this.endDay = document.getElementsByName("End")[0];
    let diffInMs : number = Date.parse(this.endDay.value) - Date.parse(this.startDay.value);
    let diffInH : number = diffInMs / 1000 / 60 / 60;
    this.difference = diffInH;
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'ARnZWQ8IICo9PI-OAZEw0JJal_VAWoJdIWOZi25aH0GejdkZsm4XOw2JwJWnKC_5FvZe4MzM5oFJbsFI'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: this.pricePH * this.difference
        }
      }]
    });
  }

  onSubmit(rent:Rent,f: NgForm){
    this.today = new Date();
    this.someDate = new Date(rent.Start);
    //if(this.someDate < this.today){
      //alert("You cannot reserve vehicle before today!");
    //}
    //else{
      //this.someDate = new Date(rent.End);
      //if(this.someDate < this.today){
        //alert("Your reservation cannot be ended before today!");
      //}
      //else{
        this.someDate = new Date(rent.Start);
        this.someDate2 = new Date(rent.End);
        debugger
        if(this.someDate > this.someDate2){
          alert("Reservation cannot be ended before it started!");
        }
        else if(this.someDate == this.someDate2){
          alert("Reservation cannot be ended at same time when it starts!");
        }
        else{
          // console.log(f.value.serviceName, f.value.email)
        rent.Vehicle = this.vehicle;
        this.profileServiceService.getMethodProfile()
        .subscribe(
          data => {
            this.appUser = data;
            rent.Email = this.appUser.Email;
            rent.Branch = this.branchToSend;
            rent.BranchStart = this.branchToRet;
          this.rentServiceService.postMethodRent(rent)
          .subscribe(
            data => {
              debugger
              alert("You rented vehicle successfully!");
              f.reset();
              this.router.navigateByUrl("/showUserRents");              
            },
            error => {
              debugger
              alert(error.error.Message)
            });
          },
          error => {
            alert(error.error.ModelState[""][0])
          });
        }
      //}
    //}
    
  }

  setBranch(br : string){
    this.branchToSend = br;
  }

  setStartBranch(br : string){
    this.branchToRet = br;
  }

}
