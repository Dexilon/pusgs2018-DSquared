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
        debugger
        this.vehicles = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  /*deleteService(id : number){
    debugger
    this.vehicleServiceServic(id)
    .subscribe(
      data => {
        alert("Service successfully deleted!");
        this.serviceServiceService.getMethodService();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }*/
/*
  saveChanges(i : number){
    debugger
    this.vehicleServiceService.updateMethodService(this.services[i].Id,this.services[i])
    .subscribe(
      data => {
        alert("Service successfully updated!");
        this.serviceServiceService.getMethodService();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }
*/
}
