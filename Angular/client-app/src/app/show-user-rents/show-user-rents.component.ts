import { Component, OnInit } from '@angular/core';
import {ProfileServiceService} from '../profileService/profile-service.service';
import {AppUser} from '../models/appUser'
import { Rent } from 'src/app/models/rent';
import { RentServiceService } from '../rent-service/rent-service.service';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-show-user-rents',
  templateUrl: './show-user-rents.component.html',
  styleUrls: ['./show-user-rents.component.css']
})
export class ShowUserRentsComponent implements OnInit {
  buttonStart: Date
  start: Date;
  end: Date;
  today: Date;
  rents: Rent[];
  pomList: Rent[]=[];
  appUser: AppUser;
  //odavde je dodato
  startDay: any;
  endDay: any;
  difference: number;
  pricePH: number;
  transaction: Transaction;
  flag : boolean = false;

  public payPalConfig?: PayPalConfig;

  constructor(private profileServiceService: ProfileServiceService, private rentServiceService: RentServiceService) { }

  ngOnInit() {
    this.profileServiceService.getMethodProfile()
    .subscribe(
      data => {
        debugger
        this.appUser = data;
        this.rents = this.appUser.Rents;
        // U slucaju ako treba nakon proglasavanja vozila nedostupnim, da se sklone rente

        /*for(var i = 0; i<this.pomList.length; i++ ){
          if(!this.pomList[i].Vehicle.Unavailable){
            this.rents.push(this.pomList[i]);
          }
        }*/
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
      
  }

  checkButton(rent: Rent){
    this.today = new Date();
    this.buttonStart = new Date(rent.Start)
    if(this.buttonStart < this.today){
      return true;
    }
    else{
      return false;
    }
  }

  deleteRent(Id : number){
    this.rentServiceService.deleteMethodRent(Id).
    subscribe(
      data => {
        this.rents = [];
        this.profileServiceService.getMethodProfile()
        .subscribe(
          data => {
            this.appUser = data;
            this.rents = this.appUser.Rents;
          },
          error => {
            alert(error.error.ModelState[""][0])
          });
      },
      error => {
        alert(error.error.ModelState[""][0])
      });
  }

  checkForPayment(rent: Rent){
    if(rent.Paid){
      return true;
    }
    else {
      return false;
    }
  }

  payWithPayPal(rent : Rent){
    this.flag = true;
    debugger
    this.startDay = new Date(rent.Start);
    this.endDay = new Date(rent.End);
    let diffInMs : number = Date.parse(this.endDay) - Date.parse(this.startDay);
    let diffInH : number = diffInMs / 1000 / 60 / 60;
    this.difference = diffInH;
    this.pricePH = rent.Vehicle.PricePerHour;
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'ARnZWQ8IICo9PI-OAZEw0JJal_VAWoJdIWOZi25aH0GejdkZsm4XOw2JwJWnKC_5FvZe4MzM5oFJbsFI'
      },
      button: {
        label: 'paypal',
      },
          onPaymentComplete: (data, actions) => {
            this.transaction = new Transaction();
            this.transaction.Amount = this.pricePH * this.difference;
            this.transaction.Rent = rent;
            this.transaction.User = this.appUser;
            this.rentServiceService.postNewTransaction(this.transaction)
            .subscribe(
              data => {
                rent.Paid = true;
                this.rentServiceService.updateMethodRent(rent.Id,rent)
                .subscribe(
                  data => {
                    this.flag = false;
                    this.ngOnInit();
                  },
                  error => {
                    alert(error.error.ModelState[""][0])
                  });
              },
              error => {
                alert(error.error.ModelState[""][0])
              });
      },
      onCancel: (data, actions) => {
        alert("Paypal transaction has been canceled!");
      },
      onError: (err) => {
        alert("Error occured: " + err);
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: this.pricePH * this.difference
        }
      }]
    });
  }
}
