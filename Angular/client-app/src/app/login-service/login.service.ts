import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/AppUser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private appUser: AppUser;
  private url: string="http://localhost:51680/api/AppUsers";
  constructor(private http: Http,private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

   getClients(): Observable<AppUser> {
     console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    return this.http.get("http://localhost:51680/api/AppUsers")
      .map(this.parseData)
      .catch(this.handleError);      
  }

  getTheToken(user){
    
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
        
        if(!localStorage.jwt)
        {
          debugger
           let x = this.httpClient.post('http://localhost:51680/oauth/token',`username=${user.email}&password=${user.password}&grant_type=password`, {"headers": headers}) as Observable<any>
    
          x.subscribe(
            res => {
              console.log(res.access_token);
              
              let jwt = res.access_token;
    
              let jwtData = jwt.split('.')[1]
              let decodedJwtJsonData = window.atob(jwtData)
              let decodedJwtData = JSON.parse(decodedJwtJsonData)

              //console.log(decodedJwtData)
    
              let role = decodedJwtData.role
    
              console.log('jwtData: ' + jwtData)
              console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
              console.log('decodedJwtData: ' + decodedJwtData)
              console.log('Role ' + role)
    
              localStorage.setItem('jwt', jwt)
              localStorage.setItem('role', role);
            },
            err => {
              console.log("Error occured");
            }
          );
        }
        /*else
        {
           let x = this.http.get('http://localhost:51680/api/Services') as Observable<any>
    
          x.subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );
        }*/
        
      }

  // getClients (): Observable<AppUser> {
  //   return this.httpClient.get<AppUser>("https://localhost:51680/api/AppUsers");
  // }


}
