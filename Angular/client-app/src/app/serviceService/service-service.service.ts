import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Service } from '../models/service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserComment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  getMethodService(): Observable<Service[]> {
    return this.http.get('http://localhost:51680/api/Services')
      .map(this.parseData)
      .catch(this.handleError);
  }

  getMethodServicePag(pageNumber): Observable<Service[]> {
    return this.http.get('http://localhost:51680/api/Services?pageIndex='+pageNumber+'&pageSize='+2)
      .map(this.parseData)
      .catch(this.handleError);
  }

  getMethodComment(): Observable<UserComment[]> {
    return this.http.get('http://localhost:51680/api/Comments')
      .map(this.parseData)
      .catch(this.handleError);
  }

  getMethodServiceById(Id: number): Observable<Service> {
    return this.http.get('http://localhost:51680/api/Services/'+Id)
      .map(this.parseData)
      .catch(this.handleError);
  }

  postMethodService(newMember): Observable<any> {
    console.log(newMember);
    return this.httpClient.post("http://localhost:51680/api/Services", newMember)
  }

  postMethodComment(newMember): Observable<any> {
    console.log(newMember);
    return this.httpClient.post("http://localhost:51680/api/Comments", newMember)
  }

  deleteMethodService(serviceId): Observable<any> {
    return this.httpClient.delete("http://localhost:51680/api/Services/"+serviceId)
  }

  // rateMethodService(serviceId, newMember): Observable<any> {
  //   return this.httpClient.delete("http://localhost:51680/api/Services/"+serviceId, newMember)
  // }

  updateMethodService(serviceId, newMember): Observable<any> {
    return this.httpClient.put("http://localhost:51680/api/Services/"+serviceId,newMember)
  }
}
