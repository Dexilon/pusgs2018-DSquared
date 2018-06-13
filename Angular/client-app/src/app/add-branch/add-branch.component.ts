import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Branch} from '../models/branch'
import {BranchServiceService} from '../branchService/branch-service.service';
import { Observable } from 'rxjs/internal/Observable';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  providers: [BranchServiceService, ServiceServiceService]
})
export class AddBranchComponent implements OnInit {

  branches: Branch[];
  services: Service[];
    constructor(private branchServiceService: BranchServiceService, private serviceServiceService: ServiceServiceService) { }
  
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

}
