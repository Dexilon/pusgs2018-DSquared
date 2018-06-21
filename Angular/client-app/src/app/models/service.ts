import { Observable } from "rxjs/internal/Observable";
import { Branch } from "../models/branch";
import { Vehicle } from "../models/vehicle";

export class Service {
    Id : number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;
    Vehicles: Vehicle[];
    Branches: Branch[];
    Rating: number;
    Activated: boolean;

    constructor(Id : number, Name:string, Logo:string,Email: string, Description: string, Vehicles: Vehicle[], Branches: Branch[], Rating: number, Activated: boolean)
    {
        this.Id = Id;
        this.Name = Name;
        this.Logo= Logo;
        this.Email = Email;
        this.Description = Description;
        this.Branches = Branches;
        this.Vehicles = Vehicles;
        this.Rating = Rating;
        this.Activated = Activated;
    }

}
