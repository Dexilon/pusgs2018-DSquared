import { Observable } from "rxjs/internal/Observable";
import { Branch } from "../models/branch";
import { Vehicle } from "../models/vehicle";

export class Service {
    Id : number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;
    Vehicles: Observable<Vehicle>;
    Branches: Observable<Branch>;

    constructor(Id : number, Name:string, Logo:string,Email: string, Description: string, Vehicles: Observable<Vehicle>, Branches: Observable<Branch>)
    {
        this.Id = Id;
        this.Name = Name;
        this.Logo= Logo;
        this.Email = Email;
        this.Description = Description;
        this.Branches = Branches;
        this.Vehicles = Vehicles;
    }

}
