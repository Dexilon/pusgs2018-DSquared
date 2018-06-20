import { Component, OnInit } from '@angular/core';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Service } from 'src/app/models/service';
import { VehicleServiceService } from 'src/app/vehicle-Service/vehicle-service.service';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-rent-a-vehicle',
  templateUrl: './rent-a-vehicle.component.html',
  styleUrls: ['./rent-a-vehicle.component.css'],
  providers: [ServiceServiceService, NavbarComponent,VehicleServiceService]
})
export class RentAVehicleComponent implements OnInit {
  services: Service[];
  vehicles: Vehicle[];
  tempId: number;
  constructor(private serviceServiceService: ServiceServiceService, private navbarComponent: NavbarComponent) { }

  ngOnInit() {
    this.serviceServiceService.getMethodService()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }


  showVehicles(i : number){
    debugger

  }



}
