import { Observable } from "rxjs/internal/Observable";
import { Branch } from "../models/branch";
import { Vehicle } from "../models/vehicle";

export class UserComment {
    Id : number;
    User_Id: number;
    Service_Id: number;
    Text: string;

    constructor(Id : number, User_Id:number, Service_Id:number, Text: string)
    {
        this.Id = Id;
        this.User_Id = User_Id;
        this.Service_Id= Service_Id;
        this.Text = Text;
    }

}
