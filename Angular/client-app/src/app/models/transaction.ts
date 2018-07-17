import { Rent } from "./rent";
import { AppUser } from "./AppUser";

export class Transaction {
    Id: number;
    Rent: Rent;
    User: AppUser;
    Amount: number;
}