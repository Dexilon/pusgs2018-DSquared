import { Component, OnInit } from '@angular/core';
import { TypeOfVehicle } from '../models/typeOfVehicle';
import { AddTypeOfVehicleServiceService } from '../type-of-vehicle-service/add-type-of-vehicle-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-show-types-of-vehicles',
  templateUrl: './show-types-of-vehicles.component.html',
  styleUrls: ['./show-types-of-vehicles.component.css'],
  providers: [AddTypeOfVehicleServiceService, NavbarComponent]
})
export class ShowTypesOfVehiclesComponent implements OnInit {
  typesOfVehicles: TypeOfVehicle[];
  
    constructor(private addTypeOfVehicleServiceService: AddTypeOfVehicleServiceService, private navbarComponent: NavbarComponent) { }

  ngOnInit() {
    this.addTypeOfVehicleServiceService.getMethodTypeOfVehicle()
    .subscribe(
      data => {
        this.typesOfVehicles = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  deleteTypeOfVehicle(id : number){
    this.addTypeOfVehicleServiceService.deleteMethodTypeOfVehicle(id)
    .subscribe(
      data => {
        alert("Type of Vehicle successfully deleted!");
        this.addTypeOfVehicleServiceService.getMethodTypeOfVehicle();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  saveChanges(i : number){
    this.addTypeOfVehicleServiceService.updateMethodTypeOfVehicle(this.typesOfVehicles[i].Id,this.typesOfVehicles[i])
    .subscribe(
      data => {
        alert("Type of Vehicle successfully updated!");
        this.addTypeOfVehicleServiceService.getMethodTypeOfVehicle();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

}
