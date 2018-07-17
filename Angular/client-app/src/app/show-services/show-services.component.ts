import { Component, OnInit } from '@angular/core';
import {Service} from '../models/service'
import {ServiceServiceService} from '../serviceService/service-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgForm } from '@angular/forms';
import { UserComment } from 'src/app/models/comment';
import { Services } from '@angular/core/src/view';
import { ProfileServiceService } from '../profileService/profile-service.service';
import { AppUser } from '../models/appUser';
import { RatingList } from '../models/RatingService';

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.css'],
  providers: [ServiceServiceService, NavbarComponent]
})
export class ShowServicesComponent implements OnInit {
    dateToCompare: Date;
    today: Date;
    user: AppUser;
    services: Service[];
    comments: UserComment[];
    pageNumber: number = 1;
    ratings: RatingList[];
    rating: RatingList;
    pageSize: number = 2;
    numberOfServices: number;
  
    constructor(private serviceServiceService: ServiceServiceService, private navbarComponent: NavbarComponent, private profileService: ProfileServiceService) { }

ngOnInit() {
    debugger
    this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })

      this.serviceServiceService.getMethodComment()
      .subscribe(
        data => {
          this.comments = data;

        },
        error => {
          alert(error.error.ModelState[""][0])
        })
        if(this.navbarComponent.checkIfLogged()){
          this.profileService.getMethodProfile()
          .subscribe(
            data => {
              debugger
              this.user = data;
              
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
        }
        this.serviceServiceService.getMethodRatings()
    .subscribe(
      data => {
        this.ratings = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })

      this.serviceServiceService.getNumberOfServices()
    .subscribe(
      data => {
        this.numberOfServices = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

checkForCommentAndRating(i:number){
  if(this.navbarComponent.checkIfLogged()){
    this.today = new Date();

    for(var ir = 0; ir < this.services[i].Branches.length; ir++){
      for(var it = 0; it < this.user.Rents.length; it++){
        if(this.services[i].Branches[ir].Address == this.user.Rents[it].Branch.Address){
          this.dateToCompare = new Date(this.user.Rents[it].End);
          if(this.today > this.dateToCompare){
            return true;
          }
        }
      }
    }
  }
          
  }

onSubmit(comment: UserComment, form: NgForm, Id: number) {
    debugger
      comment.Service_Id = Id;
      this.serviceServiceService.postMethodComment(comment)
      .subscribe(
        data => {
          alert("You commented successfully!");
          form.reset();
          this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
          .subscribe(
            data => {
              this.services = data;
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
              debugger
            this.serviceServiceService.getMethodComment()
            .subscribe(
              data => {
                this.comments = data;
                debugger
              },
              error => {
                alert(error.error.ModelState[""][0])
              })
        },
        error => {
          alert(error.error.ModelState[""][0])
        });
    }

incPageNumber()
    {
      this.pageNumber +=1;
      this.ngOnInit();
    }
decPageNumber()
    {
      this.pageNumber -=1;
      this.ngOnInit();
    }

submitRatingPos(id: number) {
  debugger
      let found:boolean = false;
      let alr:boolean = false;

      for(var i = 0; i < this.ratings.length; i++){
        if(this.ratings[i].Service.Id == this.services[id].Id){
          if(this.ratings[i].User.Id == this.user.Id){
            if(this.ratings[i].TypeOfVote == "Like"){
              found = true;
              alr = true;
              alert("You already gave positive vote for this service!");
              break;
            }
            else{
              found = true;
              this.ratings[i].TypeOfVote = "Like";
              this.rating = this.ratings[i];
              this.services[id].Rating += 2;
              break;
            }
          }
        }
      }

      if(!found){
        this.rating = new RatingList();
        this.rating.Service = this.services[id];
        this.rating.User = this.user;
        this.rating.TypeOfVote = "Like";

        this.serviceServiceService.postMethodRating(this.rating)
        .subscribe(
          data => {
            debugger
            this.ratings = data;
          },
          error => {
            debugger
            alert(error.error.ModelState[""][0])
          })

          this.services[id].Rating += 1;

        this.serviceServiceService.updateMethodService(this.services[id].Id, this.services[id])
        .subscribe(
          data => {
            debugger
            alert("Service rated successfully!");
            this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
            .subscribe(
              data => {
                this.services = data;
              },
              error => {
                alert(error.error.ModelState[""][0])
              })
                debugger
              this.serviceServiceService.getMethodComment()
              .subscribe(
                data => {
                  this.comments = data;
                  debugger
                },
                error => {
                  alert(error.error.ModelState[""][0])
                })

                this.serviceServiceService.getMethodRatings()
              .subscribe(
                data => {
                  this.ratings = data;
                  debugger
                },
                error => {
                  alert(error.error.ModelState[""][0])
                })
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
      }
      else{
        if(!alr){
          this.serviceServiceService.updateMethodRating(this.rating.Id,this.rating)
          .subscribe(
            data => {
              debugger
              this.ratings = data;

        this.serviceServiceService.updateMethodService(this.services[id].Id, this.services[id])
        .subscribe(
          data => {
            debugger
            alert("Service rated successfully!");
            this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
            .subscribe(
              data => {
                this.services = data;
              },
              error => {
                alert(error.error.ModelState[""][0])
              })
                debugger
              this.serviceServiceService.getMethodComment()
              .subscribe(
                data => {
                  this.comments = data;
                  debugger
                },
                error => {
                  alert(error.error.ModelState[""][0])
                })

                this.serviceServiceService.getMethodRatings()
              .subscribe(
                data => {
                  this.ratings = data;
                  debugger
                },
                error => {
                  alert(error.error.ModelState[""][0])
                })
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
        }
      }

      
      }

submitRatingNeg(id: number) {
  let found:boolean = false;
  let alr:boolean = false;

  for(var i = 0; i < this.ratings.length; i++){
    if(this.ratings[i].Service.Id == this.services[id].Id){
      if(this.ratings[i].User.Id == this.user.Id){
        if(this.ratings[i].TypeOfVote == "Dislike"){
          found = true;
          alr = true;
          alert("You already gave negative vote for this service!");
          break;
        }
        else{
          found = true;
          this.services[id].Rating -= 2;
          this.ratings[i].TypeOfVote = "Dislike";
          this.rating = this.ratings[i];
          break;
        }
      }
    }
  }

  if(!found){
    this.rating = new RatingList();
    this.rating.Service = this.services[id];
    this.rating.User = this.user;
    this.rating.TypeOfVote = "Dislike";
    debugger

    this.serviceServiceService.postMethodRating(this.rating)
    .subscribe(
      data => {
        debugger
        this.ratings = data;
      },
      error => {
        debugger
        alert(error.error.ModelState[""][0])
      })

      this.services[id].Rating -= 1;

    this.serviceServiceService.updateMethodService(this.services[id].Id, this.services[id])
    .subscribe(
      data => {
        debugger
        alert("Service rated successfully!");
        this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
        .subscribe(
          data => {
            this.services = data;
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
            debugger
          this.serviceServiceService.getMethodComment()
          .subscribe(
            data => {
              this.comments = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })

            this.serviceServiceService.getMethodRatings()
          .subscribe(
            data => {
              this.ratings = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }
  else{
    if(!alr){
      this.serviceServiceService.updateMethodRating(this.rating.Id,this.rating)
      .subscribe(
        data => {
          debugger
          this.ratings = data;

    this.serviceServiceService.updateMethodService(this.services[id].Id, this.services[id])
    .subscribe(
      data => {
        debugger
        alert("Service rated successfully!");
        this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
        .subscribe(
          data => {
            this.services = data;
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
            debugger
          this.serviceServiceService.getMethodComment()
          .subscribe(
            data => {
              this.comments = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })

            this.serviceServiceService.getMethodRatings()
          .subscribe(
            data => {
              this.ratings = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
        },
        error => {
          alert(error.error.ModelState[""][0])
        })
    }
  }

  
      }

deleteService(id : number){
    debugger
    this.serviceServiceService.deleteMethodService(id)
    .subscribe(
      data => {
        alert("Service successfully deleted!");
        this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
        .subscribe(
          data => {
            this.services = data;
          },
          error => {
            alert(error.error.ModelState[""][0])
          })

          this.serviceServiceService.getNumberOfServices()
    .subscribe(
      data => {
        this.numberOfServices = data;
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
            debugger
          this.serviceServiceService.getMethodComment()
          .subscribe(
            data => {
              this.comments = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  

saveChanges(i : number){
    debugger
    this.serviceServiceService.updateMethodService(this.services[i].Id,this.services[i])
    .subscribe(
      data => {
        alert("Service successfully updated!");
        this.serviceServiceService.getMethodServicePag(this.pageNumber, this.pageSize)
        .subscribe(
          data => {
            this.services = data;
          },
          error => {
            alert(error.error.ModelState[""][0])
          })
            debugger
          this.serviceServiceService.getMethodComment()
          .subscribe(
            data => {
              this.comments = data;
              debugger
            },
            error => {
              alert(error.error.ModelState[""][0])
            })
      },
      error => {
        alert(error.error.ModelState[""][0])
      })
  }

  checkForNextPage(){
    if(this.pageNumber * this.pageSize < this.numberOfServices){
      return true;
    }
    else {
      return false;
    }
  }
}
