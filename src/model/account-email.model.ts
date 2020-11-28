export class AccountEmail {
    id: string;
    email: string;
    verified: boolean;
    primary: boolean;

    constructor(id: string, email: string, verified: boolean, primary: boolean) {
        this.id = id;
        this.email = email;
        this.verified = verified;
        this.primary = primary;
    }
}