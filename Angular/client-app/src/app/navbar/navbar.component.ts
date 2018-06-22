import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkIfLogged() {
    return localStorage.jwt;
  }

  checkUserType()
  {
    return localStorage.role == 'Admin' || localStorage.role == 'Manager';
  }

  checkIfManager()
  {
    return localStorage.role == 'Manager';
  }
  
  logout()
  {
    localStorage.clear();
  }

}