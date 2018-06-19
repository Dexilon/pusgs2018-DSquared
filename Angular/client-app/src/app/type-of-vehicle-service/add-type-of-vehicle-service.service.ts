import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TypeOfVehicle } from 'src/app/models/typeOfVehicle';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AddTypeOfVehicleServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }

    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }
  
    getMethodTypeOfVehicle(): Observable<TypeOfVehicle[]> {
      return this.http.get('http://localhost:51680/api/TypeOfVehicles')
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    postMethodTypeOfVehicle(newMember): Observable<any> {
      debugger
      console.log(newMember);
      return this.httpClient.post("http://localhost:51680/api/TypeOfVehicles", newMember)
    }
}
