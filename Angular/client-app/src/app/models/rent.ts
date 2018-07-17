import { Observable } from "rxjs/internal/Observable";
import { Branch } from "../models/branch";
import { Vehicle } from "../models/vehicle";

export class Rent {
    Id : number;
    Start: Date;
    End: Date;
    Branch: string;
    BranchStart: string;
    Vehicle: Vehicle;
    Email: string;
    Paid: boolean;

    constructor(Id : number, Start:Date, End:Date, Branch: string, BranchStart: string, Vehicle: Vehicle, Email: string,
    Paid : boolean)
    {
        this.Id = Id;
        this.Start = Start;
        this.End= End;
        this.Branch = Branch;
        this.BranchStart = BranchStart;
        this.Vehicle = Vehicle;
        this.Email = Email;
        this.Paid = Paid;
    }

}
