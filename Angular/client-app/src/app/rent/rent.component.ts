import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  Id: number = -1;
  service: Service;
  branchesTemp: Branch[];
  branches: Branch[];
  vehicle: Vehicle;
  services: Service[];
appUser: AppUser;

  constructor(private profileServiceService: ProfileServiceService,private rentServiceService: RentServiceService, private serviceServiceService: ServiceServiceService, private activatedRoute: ActivatedRoute, private branchServiceService: BranchServiceService, private vehicleServiceService: VehicleServiceService) {
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
   }
  
  ngOnInit() {
    this.serviceServiceService.getMethodService()
    .subscribe(
      data => {
        this.services = data;
        

        this.vehicleServiceService.getMethodVehicleById(this.Id)
        .subscribe(
          data => {
            this.vehicle = data;
  
            debugger
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

  onSubmit(rent:Rent,f: NgForm){
    debugger
    // console.log(f.value.serviceName, f.value.email)
    rent.Vehicle = this.vehicle;
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        this.appUser = data;
        rent.Email = this.appUser.Email;
        
      this.rentServiceService.postMethodRent(rent)
      .subscribe(
        data => {
          debugger
          alert("You rented vehicle successfully!");
          f.reset();
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

}
