import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppUser} from '../models/appUser'
import {RegisterServiceService} from '../registerService/register-service.service';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterServiceService]
})
export class RegisterComponent implements OnInit {

  constructor(private registerServiceService: RegisterServiceService, private router : Router) { }

  ngOnInit() {
  }
  
  onSubmit(appUser: AppUser, form: NgForm) {
    if(appUser.Password != appUser.ConfirmPassword){
      alert("Password doesn't match!");
    }
    else{
      console.log(appUser);
      this.registerServiceService.postMethodRegister(appUser)
      .subscribe(
        data => {
          alert("You have been successfully registered!");
          this.router.navigateByUrl("/login");
          form.reset();
        },
        error => {
          //alert(error.error.ModelState[""][0])
          alert("Passwords must have at least one non letter or digit character. Passwords must have at least one digit ('0'-'9'). Passwords must have at least one uppercase ('A'-'Z'). Passwords must have at least one lowercase ('a'-'z'). ");
        })
    }
  }

}
