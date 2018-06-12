import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ClockComponent } from './clock/clock.component';
import { SignalRService } from 'src/app/services/signal-rservice.service';
import { RegisterServiceService } from 'src/app/registerService/register-service.service';

const Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "addService",
    component: AddServiceComponent
  },
  {
    path: "addVehicle",
    component: AddVehicleComponent
  },
  {
    path: "addBranch",
    component: AddBranchComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AddServiceComponent,
    AddVehicleComponent,
    AddBranchComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [SignalRService, RegisterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
