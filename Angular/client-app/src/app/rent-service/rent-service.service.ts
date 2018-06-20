import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Service } from '../models/service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Rent } from 'src/app/models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }

    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }
  
    getMethodRent(): Observable<Rent[]> {
      return this.http.get('http://localhost:51680/api/Rents')
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    getMethodRentById(Id: number): Observable<Rent> {
      return this.http.get('http://localhost:51680/api/Rents/'+Id)
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    postMethodRent(newMember): Observable<any> {
      console.log(newMember);
      return this.httpClient.post("http://localhost:51680/api/Rents", newMember)
    }
  
    deleteMethodRent(serviceId): Observable<any> {
      return this.httpClient.delete("http://localhost:51680/api/Rents/"+serviceId)
    }
  
    updateMethodRent(serviceId, newMember): Observable<any> {
      return this.httpClient.put("http://localhost:51680/api/Rents/"+serviceId,newMember)
    }
  }
  