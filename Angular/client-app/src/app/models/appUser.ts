import { Rent } from "../models/rent";

export class AppUser {
    Id: number;
    FullName: string;
    Email: string;
    BirthDay; Date;
    Password: string;
    ConfirmPassword: string;
    PersonalDocument: string;
    Activated: boolean;
    Rents: Rent[];

    constructor(Id: number, FullName:string, Email:string,BirthDay: Date, Password: string, ConfirmPassword: string, PersonalDocument: string, Activated: boolean, Rents: Rent[])
    {
        this.Id = Id;
        this.FullName = FullName;
        this.Email= Email;
        this.BirthDay = BirthDay;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
        this.PersonalDocument = PersonalDocument;
        this.Activated = Activated;
        this.Rents = Rents;
    }

}
