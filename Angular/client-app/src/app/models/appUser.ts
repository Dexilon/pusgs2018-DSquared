export class AppUser {
    Id: number;
    FullName: string;
    Email: string;
    BirthDay; Date;
    Password: string;
    ConfirmPassword: string;

    constructor(Id: number, FullName:string, Email:string,BirthDay: Date, Password: string, ConfirmPassword: string)
    {
        this.Id = Id;
        this.FullName = FullName;
        this.Email= Email;
        this.BirthDay = BirthDay;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
    }

}
