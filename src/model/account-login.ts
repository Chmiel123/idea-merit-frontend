import { Account } from './account';

export class AccountLogin {
    
    constructor(
        public account: Account | null,
        public access_token: string,
        public refresh_token: string
    ) { }

    static parse(plain: any): AccountLogin {
        const result = new AccountLogin(
            null,
            plain.access_token,
            plain.refresh_token
        );
        if (plain.account) {
            result.account = Account.parse(plain.account);
        }
        return result;
    }

    pretty_print() {
        return "so pretty";
    }
}