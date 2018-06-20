import { Observable } from "rxjs/internal/Observable";
import { Branch } from "../models/branch";
import { Vehicle } from "../models/vehicle";

export class Rent {
    Id : number;
    Start: Date;
    End: Date;
    Branch: Branch;
    Vehicle: Vehicle;
    Email: string;

    constructor(Id : number, Start:Date, End:Date, Branch: Branch, Vehicle: Vehicle, Email: string)
    {
        this.Id = Id;
        this.Start = Start;
        this.End= End;
        this.Branch = Branch;
        this.Vehicle = Vehicle;
        this.Email = Email;
    }

}
