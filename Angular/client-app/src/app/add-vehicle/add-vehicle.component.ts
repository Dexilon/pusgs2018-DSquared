import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Branch} from '../models/branch'
import {BranchServiceService} from '../branchService/branch-service.service';
import { Observable } from 'rxjs/internal/Observable';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import {VehicleServiceService} from '../vehicle-Service/vehicle-service.service'
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {Vehicle} from '../models/vehicle';
import { TypeOfVehicle } from 'src/app/models/typeOfVehicle';
import { AddTypeOfVehicleServiceService } from 'src/app/type-of-vehicle-service/add-type-of-vehicle-service.service';
import { debuglog } from 'util';


const URL = 'http://localhost:51680/api/Upload/user/PostVehicleImage';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  providers: [VehicleServiceService, ServiceServiceService, AddTypeOfVehicleServiceService]
})
export class AddVehicleComponent implements OnInit {
  vehicles: Vehicle[];
  services: Service[];
  typeOfVehicles: TypeOfVehicle[];
  url: string[]= [];

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  
  helper: string;

  constructor(private branchServiceService: BranchServiceService, private serviceServiceService: ServiceServiceService, private vehicleServiceService: VehicleServiceService, private addTypeOfVehicleServiceService: AddTypeOfVehicleServiceService) {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
      debugger
        this.helper = JSON.parse(response);
        this.url.push(this.helper);        
    }
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

    this.vehicleServiceService.getMethodVehicle()
    .subscribe(
      data => {
        this.vehicles = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })

      this.addTypeOfVehicleServiceService.getMethodTypeOfVehicle()
      .subscribe(
        data => {
          this.typeOfVehicles = data;
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
    // this.branchServiceService.getMethodBranch()
    // .subscribe(
    //   data => {
    //     this.branches = data;
    //   },
    //   error => {
    //     alert(error.error.ModelState[""][0])
    //   })
  }

  onSubmit(vehicle:Vehicle,f: NgForm){
    // console.log(f.value.serviceName, f.value.email)
    vehicle.Unavailable = false;
    vehicle.Images = this.url;
    //console.log(vehicle);
    debugger
    // vehicle.Images.push(this.url);
    this.vehicleServiceService.postMethodVehicle(vehicle)
    .subscribe(
      data => {
        debugger
        alert("You added vehicle successfully!");
        f.reset();
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
  
}
