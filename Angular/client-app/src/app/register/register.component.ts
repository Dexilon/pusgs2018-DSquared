import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppUser} from '../models/appUser'
import {RegisterServiceService} from '../registerService/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterServiceService]
})
export class RegisterComponent implements OnInit {

  constructor(private registerServiceService: RegisterServiceService) { }

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
          form.reset();
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
    }
  }

}
