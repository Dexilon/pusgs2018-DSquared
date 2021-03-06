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

    searchKeyWord(criteria:string, keyWord:string): Observable<Vehicle[]>{
      var nesto = 'http://localhost:51680/api/Vehicles/Search/' + criteria + '/' + keyWord;
      return this.http.get(nesto)
      .map(this.parseData)
      .catch(this.handleError);
    }
  
    getMethodVehicle(): Observable<Vehicle[]> {
      return this.http.get('http://localhost:51680/api/Vehicles')
        .map(this.parseData)
        .catch(this.handleError);
    }

    getMethodVehiclePag(pageNumber, pageSize): Observable<Vehicle[]> {
      return this.http.get('http://localhost:51680/api/Vehicles?pageIndex='+pageNumber+'&pageSize='+pageSize)
        .map(this.parseData)
        .catch(this.handleError);
    }

    getNumberOfVehicles(): Observable<number> {
      return this.http.get('http://localhost:51680/api/Vehicles/GetNumberOfVehicles')
        .map(this.parseData)
        .catch(this.handleError);
    }

    getMethodVehicleById(Id: number): Observable<Vehicle> {
      return this.http.get('http://localhost:51680/api/Vehicles/'+Id)
        .map(this.parseData)
        .catch(this.handleError);
    }
  
    postMethodVehicle(newMember): Observable<any> {
      return this.httpClient.post("http://localhost:51680/api/Vehicles", newMember)
    }

    deleteMethodVehicle(vehicleId): Observable<any> {
      return this.httpClient.delete("http://localhost:51680/api/Vehicles/" + vehicleId)
    }

    updateMethodVehicle(vehicleId, newMember): Observable<any> {
      return this.httpClient.put("http://localhost:51680/api/Vehicles/" + newMember.Id,newMember)
    }
}
