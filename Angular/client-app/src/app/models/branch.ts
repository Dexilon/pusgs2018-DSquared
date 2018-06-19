export class Branch {
    Id : number;
    Logo: string;
    Address: string;
    Latitude: number;
    Longitude: number;
    ServiceName: string;

    constructor(Id : number, Logo:string, Address:string,Latitude: number, Longitude: number, ServerName: string)
    {
        this.Id = Id;
        this.Logo = Logo;
        this.Address = Address;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.ServiceName = ServerName;
    }

}
