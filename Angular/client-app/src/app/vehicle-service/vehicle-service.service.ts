import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Branch } from '../models/branch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Vehicle } from 'src/app/models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }

    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }
  
    getMethodVehicle(): Observable<Vehicle[]> {
      return this.http.get('http://localhost:51680/api/Vehicles')
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    postMethodVehicle(newMember): Observable<any> {
      return this.httpClient.post("http://localhost:51680/api/Vehicles", newMember)
    }

    deleteMethodVehicle(vehicleId): Observable<any> {
      debugger
      return this.httpClient.delete("http://localhost:51680/api/Vehicles/" + vehicleId)
    }

    updateMethodVehicle(vehicleId, newMember): Observable<any> {
      debugger
      return this.httpClient.put("http://localhost:51680/api/Vehicles/" + vehicleId,newMember)
    }
}
