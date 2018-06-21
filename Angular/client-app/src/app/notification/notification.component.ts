import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from 'src/app/profileService/profile-service.service';
import { Profile } from 'selenium-webdriver/firefox';
import { AppUser } from 'src/app/models/AppUser';
import { ServiceServiceService } from 'src/app/serviceService/service-service.service';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private profileServiceService: ProfileServiceService, private serviceServiceService: ServiceServiceService) { }

  profiles: AppUser[] = [];
  services: Service[] = [];

  ngOnInit() {
    this.profileServiceService.getMethodProfileForValidation()
    .subscribe(
      data => {
        this.profiles = data;
        
      },
      error => {
        alert(error.error.ModelState[""][0])
      });

      this.serviceServiceService.getMethodServiceForValidation()
      .subscribe(
        data => {
          this.services = data;
          
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }

    validateAppUser(id:number)
    {
      this.profiles[id].Activated = true;
      debugger
      this.profileServiceService.putMethodProfile(this.profiles[id].Id,this.profiles[id])
      .subscribe(
        data => {
          alert("User validated successfully!");
          this.profileServiceService.getMethodProfileForValidation()
          .subscribe(
            data => {
              this.profiles = data;
              
            },
            error => {
              alert(error.error.ModelState[""][0])
            });
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }


    validateService(id:number)
    {
      this.services[id].Activated = true;
      debugger
      this.serviceServiceService.updateMethodService(this.services[id].Id,this.services[id])
      .subscribe(
        data => {
          alert("Service validated successfully!");
          this.serviceServiceService.getMethodServiceForValidation()
          .subscribe(
            data => {
              this.services = data;
              
            },
            error => {
              alert(error.error.ModelState[""][0])
            });
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }


    deleteService(id : number){
      debugger
      this.serviceServiceService.deleteMethodService(id)
      .subscribe(
        data => {
          alert("Service successfully deleted!");
          this.serviceServiceService.getMethodServiceForValidation()
          .subscribe(
            data => {
              this.services = data;
              
            },
            error => {
              alert(error.error.ModelState[""][0])
            });
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
    }
    // checkIfUploaded(){
    //   for(var i = 0; i<this.profiles.length; i++)
    //   {
        
    //       if(this.profiles[i].PersonalDocument == null || this.profiles[i].PersonalDocument == ""){
    //         return false;
    //       }
    //       else{
    //         return true;
    //       }
        
    //   }
    // }

}
