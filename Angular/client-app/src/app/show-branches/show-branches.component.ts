import { Component, OnInit } from '@angular/core';
import {Branch} from '../models/branch'
import {BranchServiceService} from '../branchService/branch-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-show-branches',
  templateUrl: './show-branches.component.html',
  styleUrls: ['./show-branches.component.css'],
  providers: [BranchServiceService, NavbarComponent]
})
export class ShowBranchesComponent implements OnInit {
  branches: Branch[];
  
    constructor(private branchServiceService: BranchServiceService, private navbarComponent: NavbarComponent) { }

  ngOnInit() {
    this.branchServiceService.getMethodBranch()
    .subscribe(
      data => {
        this.branches = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  deleteBranch(id : number){
    debugger
    this.branchServiceService.deleteMethodBranch(id)
    .subscribe(
      data => {
        alert("Branch successfully deleted!");
        this.branchServiceService.getMethodBranch();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  saveChanges(i : number){
    debugger
    this.branchServiceService.updateMethodBranch(this.branches[i].Id,this.branches[i])
    .subscribe(
      data => {
        alert("Branch successfully updated!");
        this.branchServiceService.getMethodBranch();
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }
}
