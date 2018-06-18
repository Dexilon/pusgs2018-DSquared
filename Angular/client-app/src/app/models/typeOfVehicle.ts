import { Observable } from "rxjs/internal/Observable";
import { Vehicle } from "src/app/models/vehicle";

export class TypeOfVehicle {
    Id: number;
    Name: string;
    Vehicles: Observable<Vehicle>;

    constructor(Id: number, Name: string,Vehicles: Observable<Vehicle>)
    {
        this.Id = Id;
        this.Name= Name;
        this.Vehicles = Vehicles;
    }

}
