import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Branch } from '../models/branch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class BranchServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }
  
    getMethodBranch(): Observable<Branch[]> {
      return this.http.get('http://localhost:51680/api/Branches')
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    postMethodBranch(newMember): Observable<any> {
      console.log(newMember);
      return this.httpClient.post("http://localhost:51680/api/Branches", newMember)
    }
  }
  