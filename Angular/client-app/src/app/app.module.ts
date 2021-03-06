import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

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
import { ShowTypesOfVehiclesComponent } from './show-types-of-vehicles/show-types-of-vehicles.component';
import { AddTypeOfVehicleServiceService } from 'src/app/type-of-vehicle-service/add-type-of-vehicle-service.service';
import { RentAVehicleComponent } from './rent-a-vehicle/rent-a-vehicle.component';
import { ShowVehiclesOfServiceComponent } from './show-vehicles-of-service/show-vehicles-of-service.component';
import { RentComponent } from './rent/rent.component';
import { MapComponent } from './map/map.component';
import { ShowUserRentsComponent } from './show-user-rents/show-user-rents.component';
import { NotificationComponent } from './notification/notification.component';
import { NgxPayPalModule } from 'ngx-paypal';

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
    canActivate: ['CanUserActivateGuard']    
  },
  {
    path: "addTypeOfVehicle",
    component: AddTypeOfVehicleComponent,
    canActivate: ['CanAdminActivateGuard']     
  },
  {
    path: "showVehicles",
    component: ShowVehiclesComponent
  },
  {
    path: "showTypesOfVehicles",
    component: ShowTypesOfVehiclesComponent
  },
  {
    path: "rentAVehicle",
    component: RentAVehicleComponent,
    canActivate: ['CanAllRolesActivateGuard']
  },
  {
    path: "showVehiclesOfService/:Id",
    component: ShowVehiclesOfServiceComponent,
    canActivate: ['CanAllRolesActivateGuard']
  },
  {
    path: "rentVehicle/:Id",
    component: RentComponent,
    canActivate: ['CanUserActivateGuard']
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "showUserRents",
    component: ShowUserRentsComponent,
    canActivate: ['CanUserActivateGuard']    
  },
  {
    path: "notifications",
    component: NotificationComponent,
    canActivate: ['CanAdminActivateGuard']    
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
    ShowVehiclesComponent,
    ShowTypesOfVehiclesComponent,
    RentAVehicleComponent,
    ShowVehiclesOfServiceComponent,
    RentComponent,
    MapComponent,
    ShowUserRentsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    NgxPayPalModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    HttpClientXsrfModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [SignalRService,RegisterServiceService, ServiceServiceService, BranchServiceService, VehicleServiceService, AddTypeOfVehicleServiceService,
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
    },
    {
      provide: 'CanAdminActivateGuard',
      useValue: () => { 
        if(localStorage.role == "Admin")
        {
          return true;
        }
        
      } 
    },
    {
      provide: 'CanManagerActivateGuard',
      useValue: () => {
        if(localStorage.role == "Manager")
        {
          return true;
        }
      } 
    },
    {
      provide: 'CanUserActivateGuard',
      useValue: () => {
        if(localStorage.role == "AppUser")
        {
          return true;
        }
      } 
    },
    {
      provide: 'CanAllRolesActivateGuard',
      useValue: () => {
        if(localStorage.role == "AppUser" || localStorage.role == "Manager" || localStorage.role == "Admin")
        {
          return true;
        }
      } 
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
