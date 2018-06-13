import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:51680/api/Upload/user/PostUserImage';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  providers: [ServiceServiceService]
})
export class AddServiceComponent implements OnInit {

  services: Service[];
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;


  constructor(private serviceServiceService: ServiceServiceService) { 
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);        
    };
  }

  uploadFile: any;

  
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
    
      service.Logo=this.url;
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

    
  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

}
