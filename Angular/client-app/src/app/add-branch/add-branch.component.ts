import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Branch} from '../models/branch'
import {BranchServiceService} from '../branchService/branch-service.service';
import { Observable } from 'rxjs/internal/Observable';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:51680/api/Upload/user/PostBranchImage';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  providers: [BranchServiceService, ServiceServiceService]
})
export class AddBranchComponent implements OnInit {

  branches: Branch[];
  services: Service[];
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

    constructor(private branchServiceService: BranchServiceService, private serviceServiceService: ServiceServiceService) { 
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
      this.branchServiceService.getMethodBranch()
      .subscribe(
        data => {
          this.branches = data;
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
    }
  
    onSubmit(branch: Branch, form: NgForm) {
        console.log(branch);
        branch.Logo = this.url;
        this.branchServiceService.postMethodBranch(branch)
        .subscribe(
          data => {
            alert("You added branch successfully!");
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
