import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/appUser';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }

    getMethodProfile(): Observable<any> {
      return this.httpClient.get("http://localhost:51680/api/AppUsers/GetCurrentUser");
    }

    getMethodProfileForValidation(): Observable<any> {
      return this.httpClient.get("http://localhost:51680/api/AppUsers/GetAppUsersForValidation");
    }
  
    putMethodProfile(id, newMember): Observable<any> {
      return this.httpClient.put("http://localhost:51680/api/AppUsers/" + id,newMember);
    }

    postMethodProfile(newMember): Observable<any> {
      return this.httpClient.post("http://localhost:51680/api/Account/ChangePassword",newMember);
    }

    sendMail(id): Observable<any> {
      return this.httpClient.post("http://localhost:51680/api/AppUsers/AproveUser/" + id, id);
    }

    sendMailDisapprovedUser(id): Observable<any> {
      return this.httpClient.post("http://localhost:51680/api/AppUsers/DisapproveUser/" + id, id);
    }
  
}
