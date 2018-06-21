import { Observable } from "rxjs/internal/Observable";
import { TypeOfVehicle } from "src/app/models/typeOfVehicle";
import { Service } from "src/app/models/service";

export class Vehicle {
    Id: number;
    Model: string;
    Manufactor: string;
    Year: number;
    Description: string;
    PricePerHour: number;
    Unavailable: boolean;
    Images: string[];
    Type: TypeOfVehicle;
    Service: Service;

    constructor(Id:number, Model:string,Manufactor: string, Year: number, Description: string, PricePerHour: number, Unavailable: boolean, Images: string[], Type: TypeOfVehicle, Service: Service)
    {
        this.Id = Id;
        this.Model= Model;
        this.Manufactor = Manufactor;
        this.Year = Year;
        this.Description = Description;
        this.PricePerHour = PricePerHour;
        this.Unavailable = Unavailable;
        this.Images = Images;
        this.Type = Type;
        this.Service = Service;
    }

}
