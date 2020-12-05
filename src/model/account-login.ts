import { Account } from './account';

export class AccountLogin {
    constructor(
        public account: Account | null,
        public access_token: string,
        public refresh_token: string
    ) { }
}