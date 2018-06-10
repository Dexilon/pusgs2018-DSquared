import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  onSubmit(f: NgForm){
    console.log(f.value.serviceName, f.value.email)
  }

}
