import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.css'],
  providers: [ServiceServiceService]
})
export class ShowServicesComponent implements OnInit {
    services: Service[];
  
    constructor(private serviceServiceService: ServiceServiceService) { }

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

}
