export class UserProfile {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(OldPassword: string, NewPassword: string, ConfirmPassword: string)
    {
        this.OldPassword = OldPassword;
        this.NewPassword = NewPassword;
        this.ConfirmPassword = ConfirmPassword;
    }

}
