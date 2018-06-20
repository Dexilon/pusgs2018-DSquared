import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/login-service/login.service';
import { AppUser } from 'src/app/models/AppUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private result: AppUser;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
 
  onSubmit(f: NgForm){
    this.loginService.getTheToken(f.value)
  }
}
