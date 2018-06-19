import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/interceptor';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ShowServicesComponent } from './show-services/show-services.component';
import { ClockComponent } from './clock/clock.component';
import { SignalRService } from 'src/app/services/signal-rservice.service';
import { Http } from '@angular/http/src/http';

import {CanActivateViaAuthGuard} from './guard/auth.guard';
import { RegisterServiceService } from 'src/app/registerService/register-service.service';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { BranchServiceService } from 'src/app/branchService/branch-service.service';
import { VehicleServiceService } from 'src/app/vehicle-service/vehicle-service.service';
import { ShowBranchesComponent } from './show-branches/show-branches.component';
import { ProfileComponent } from './profile/profile.component';
import { AddTypeOfVehicleComponent } from './add-type-of-vehicle/add-type-of-vehicle.component';
import { TypeOfVehicle } from 'src/app/models/typeOfVehicle';
import { ShowVehiclesComponent } from './show-vehicles/show-vehicles.component';

const Routes = [
  {
    path: "register",
    component: RegisterComponent,
    
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "addService",
    component: AddServiceComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "addVehicle",
    component: AddVehicleComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "addBranch",
    component: AddBranchComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "showServices",
    component: ShowServicesComponent
  },
  {
    path: "showBranches",
    component: ShowBranchesComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "addTypeOfVehicle",
    component: AddTypeOfVehicleComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "showVehicles",
    component: ShowVehiclesComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FileSelectDirective,
    LoginComponent,
    RegisterComponent,
    AddServiceComponent,
    AddVehicleComponent,
    AddBranchComponent,
    ShowServicesComponent,
    ClockComponent,
    ShowBranchesComponent,
    ProfileComponent,
    AddTypeOfVehicleComponent,
    ShowVehiclesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [SignalRService,RegisterServiceService, ServiceServiceService, BranchServiceService, VehicleServiceService,
    CanActivateViaAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      } 
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
