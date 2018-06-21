import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgForm } from '@angular/forms';
import { UserComment } from 'src/app/models/comment';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.css'],
  providers: [ServiceServiceService, NavbarComponent]
})
export class ShowServicesComponent implements OnInit {
    services: Service[];
    comments: UserComment[];
  
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
        debugger
      this.serviceServiceService.getMethodComment()
      .subscribe(
        data => {
          this.comments = data;
          debugger
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
  
  }

  onSubmit(comment: UserComment, form: NgForm, Id: number) {
    debugger
      comment.Service_Id = Id;
      console.log(comment);
      this.serviceServiceService.postMethodComment(comment)
      .subscribe(
        data => {
          alert("You commented successfully!");
          form.reset();
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }

    submitRatingPos(id: number) {
      this.serviceServiceService.rateMethodService(id)
      .subscribe(
        data => {
          alert("Service rated successfully!");
          this.serviceServiceService.getMethodService();
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
      }

    submitRatingNeg(id: number) {
        
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
