export class AccountEmail {
    email: string;
    verified: boolean;
    primary: boolean;

    constructor(email: string, verified: boolean, primary: boolean) {
        this.email = email;
        this.verified = verified;
        this.primary = primary;
    }

    static parse(plain: any): AccountEmail {
        const result = new AccountEmail(
            plain.email,
            plain.verified,
            plain.primary
        );
        return result;
    }
}