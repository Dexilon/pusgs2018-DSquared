import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TypeOfVehicle } from 'src/app/models/typeOfVehicle';
import {AddTypeOfVehicleServiceService} from '../type-of-vehicle-service/add-type-of-vehicle-service.service'

@Component({
  selector: 'app-add-type-of-vehicle',
  templateUrl: './add-type-of-vehicle.component.html',
  styleUrls: ['./add-type-of-vehicle.component.css'],
  providers: [AddTypeOfVehicleServiceService]
})
export class AddTypeOfVehicleComponent implements OnInit {
  typeOfVehicles: TypeOfVehicle[];
  constructor( private addTypeOfVehicleServiceService: AddTypeOfVehicleServiceService){
  
  }

  ngOnInit() {
    this.addTypeOfVehicleServiceService.getMethodTypeOfVehicle()
    .subscribe(
      data => {
        this.typeOfVehicles = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  onSubmit(typeOfVehicle:TypeOfVehicle,f: NgForm){
    // console.log(f.value.serviceName, f.value.email)
    console.log(typeOfVehicle);
    // vehicle.Images.push(this.url);
    this.addTypeOfVehicleServiceService.postMethodTypeOfVehicle(typeOfVehicle)
    .subscribe(
      data => {
        alert("You added vehicle type successfully!");
        f.reset();
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

}
