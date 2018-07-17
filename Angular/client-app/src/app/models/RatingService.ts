import { AppUser } from "./AppUser";
import { Service } from "./service";

export class RatingList {
    Id : number;
    User: AppUser;
    Service: Service;
    TypeOfVote: string;
}
