import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { Service } from 'src/app/models/service';
import { Vehicle } from 'src/app/models/vehicle';
import { Rent } from 'src/app/models/rent';
import { RentServiceService } from 'src/app/rent-service/rent-service.service';
import { DatePipe } from '@angular/common/src/pipes';
import { isDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-show-vehicles-of-service',
  templateUrl: './show-vehicles-of-service.component.html',
  styleUrls: ['./show-vehicles-of-service.component.css'],
  providers: [ServiceServiceService]
})
export class ShowVehiclesOfServiceComponent implements OnInit {
  Id: number = -1;
  service: Service;
  vehicles: Vehicle[];
  vehiclesForbidden: Vehicle[] = [];
  rents: Rent[];
  today: Date;
  end: Date;


  temp1: number;
  temp2: number;

  constructor(private rentServiceService: RentServiceService, private activatedRoute: ActivatedRoute, private serviceServiceService: ServiceServiceService ) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});
    this.today = new Date();
    this.end = new Date();
    debugger

  }
  
  ngOnInit() {
    this.serviceServiceService.getMethodServiceById(this.Id)
    .subscribe(
      data => {
        this.service = data;
        this.vehicles = this.service.Vehicles;

        this.rentServiceService.getMethodRent()
        .subscribe(
          data => {
            this.rents = data;
            this.checkRentDate();
            debugger
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
      


        
  }

  checkRentDate()
  {
    
    for(var i=0; i<this.rents.length; i++)
    {
      for(var j=0; j<this.vehicles.length; j++)
      {

        this.temp1 = this.rents[i].Vehicle.Id;
        this.temp2 = this.vehicles[j].Id;
        if(this.temp1 == this.temp2 )
        {
          
          debugger
          
          this.end = new Date(this.rents[i].End);
          if(this.end >= this.today)
          {
            this.vehiclesForbidden.push(this.vehicles[j]);
            debugger
          }
        }
      }
    }
  }

  checkIfRented(ii:number)
  {
    debugger
    for(var i = 0; i< this.vehiclesForbidden.length; i++)
    {
      if(this.vehicles[ii].Id == this.vehiclesForbidden[i].Id)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  checkVehicleAvailability(i : number){
    if(this.vehicles[i].Unavailable){
      return true;
    }
    else{
      return false;
    }
  }

}
