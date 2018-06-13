import { Component, OnInit } from '@angular/core';
import {Branch} from '../models/branch'
import {BranchServiceService} from '../branchService/branch-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-show-branches',
  templateUrl: './show-branches.component.html',
  styleUrls: ['./show-branches.component.css'],
  providers: [BranchServiceService]
})
export class ShowBranchesComponent implements OnInit {
  branches: Branch[];
  
    constructor(private branchServiceService: BranchServiceService) { }

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
}
