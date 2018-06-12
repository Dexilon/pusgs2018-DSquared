export class AppUser {
    FullName: string;
    Email: string;
    BirthDay: Date;
    Password: string;
    ConfirmPassword: string;

    constructor(FullName:string, Email: string, BirthDay: Date, Password: string, ConfirmPassword: string) {
        this.FullName = FullName;
        this.Email = Email;
        this.BirthDay = BirthDay;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
    }
}
