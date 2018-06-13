export class Branch {
    Logo: string;
    Address: string;
    Latitude: number;
    Longitude: number;
    ServiceName: string;

    constructor(Logo:string, Address:string,Latitude: number, Longitude: number, ServerName: string)
    {
        this.Logo = Logo;
        this.Address = Address;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.ServiceName = ServerName;
    }

}
