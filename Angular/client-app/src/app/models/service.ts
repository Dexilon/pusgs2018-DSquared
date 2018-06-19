export class Service {
    Id : number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;

    constructor(Id : number, Name:string, Logo:string,Email: string, Description: string)
    {
        this.Id = Id;
        this.Name = Name;
        this.Logo= Logo;
        this.Email = Email;
        this.Description = Description;
    }

}
