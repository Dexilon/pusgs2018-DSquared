import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  providers: [ServiceServiceService]
})
export class AddServiceComponent implements OnInit {

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

  onSubmit(service: Service, form: NgForm) {
      console.log(service);
      this.serviceServiceService.postMethodService(service)
      .subscribe(
        data => {
          alert("You added service successfully!");
          form.reset();
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }

    checkIfLogged() {
      return localStorage.jwt;
    }

}
