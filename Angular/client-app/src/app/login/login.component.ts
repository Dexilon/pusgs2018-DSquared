import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/login-service/login.service';
import { AppUser } from 'src/app/models/AppUser';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private result: AppUser;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
 
  onSubmit(f: NgForm){
    this.loginService.getTheToken(f.value)
    console.log(f.value.email, f.value.password)
    this.router.navigateByUrl("/");
  }

  // callGet(){
  //   debugger
  //   console.log("CAO POOZZ");
  //   this.loginService.getTheToken()
  // }


}
