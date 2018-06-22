import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor() {}

  canActivate() {
    return localStorage.role == 'Admin' || localStorage.role == 'Manager';
  }

  canActivateManager() {
    return localStorage.role == 'Manager';
  }

  canActivateAdmin() {
    return localStorage.role == 'Admin';
  }

  canActivateUser() {
    return localStorage.role == 'User';
  }

  canActivateEveryone() {
    return localStorage.role == 'User' || localStorage.role == 'Admin' || localStorage.role == 'Manager';
  }
}