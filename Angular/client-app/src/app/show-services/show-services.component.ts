import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.css'],
  providers: [ServiceServiceService, NavbarComponent]
})
export class ShowServicesComponent implements OnInit {
    services: Service[];
  
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

  deleteService(id : number){
    debugger
    this.serviceServiceService.deleteMethodService(id)
    .subscribe(
      data => {
        alert("Service successfully deleted!");
        this.serviceServiceService.getMethodService();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  saveChanges(i : number){
    debugger
    this.serviceServiceService.updateMethodService(this.services[i].Id,this.services[i])
    .subscribe(
      data => {
        alert("Service successfully updated!");
        this.serviceServiceService.getMethodService();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

}
