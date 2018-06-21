import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { Service } from 'src/app/models/service';
import { Vehicle } from 'src/app/models/vehicle';

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

  constructor(private activatedRoute: ActivatedRoute, private serviceServiceService: ServiceServiceService ) { 
    activatedRoute.params.subscribe(params => {this.Id = params["Id"]});

  }
  
  ngOnInit() {
    this.serviceServiceService.getMethodServiceById(this.Id)
    .subscribe(
      data => {
        this.service = data;
        this.vehicles = this.service.Vehicles;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
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
