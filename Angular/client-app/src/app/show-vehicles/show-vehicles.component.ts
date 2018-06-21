import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../models/vehicle'
import {TypeOfVehicle} from '../models/typeOfVehicle'
import {VehicleServiceService} from '../vehicle-service/vehicle-service.service';
import {AddTypeOfVehicleServiceService} from '../type-of-vehicle-service/add-type-of-vehicle-service.service'
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-show-vehicles',
  templateUrl: './show-vehicles.component.html',
  styleUrls: ['./show-vehicles.component.css'],
  providers: [AddTypeOfVehicleServiceService, NavbarComponent, VehicleServiceService]
})
export class ShowVehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  
    constructor(private vehicleServiceService: VehicleServiceService, private navbarComponent: NavbarComponent) { }

  ngOnInit() {
    this.vehicleServiceService.getMethodVehicle()
    .subscribe(
      data => {
        this.vehicles = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  deleteVehicle(id : number){
    this.vehicleServiceService.deleteMethodVehicle(id)
    .subscribe(
      data => {
        alert("Vehicle successfully deleted!");
        this.vehicleServiceService.getMethodVehicle();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  saveChanges(i : number){
    this.vehicleServiceService.updateMethodVehicle(this.vehicles[i].Id,this.vehicles[i])
    .subscribe(
      data => {
        alert("Vehicle successfully updated!");
        this.vehicleServiceService.getMethodVehicle();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  changeVehicleAvailability(i : number){
    if(this.vehicles[i].Unavailable){
      this.vehicles[i].Unavailable = false;
    }
    else{
      this.vehicles[i].Unavailable = true;
    }
    this.vehicleServiceService.updateMethodVehicle(this.vehicles[i].Id,this.vehicles[i])
    .subscribe(
      data => {
        alert("Vehicle availability changed!");
        this.vehicleServiceService.getMethodVehicle();
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
