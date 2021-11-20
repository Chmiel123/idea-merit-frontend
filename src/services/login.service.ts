import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from 'src/model/account';
import { AccountLogin } from 'src/model/account-login';
import { AlertService } from 'src/services/alert.service';
import { AccountEmail } from 'src/model/account-email';


@Injectable({ providedIn: 'root' })
export class LoginService {
    private loginSubject: BehaviorSubject<AccountLogin | null>;
    public loginObservable: Observable<AccountLogin | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService
    ) {
        let s = localStorage.getItem('login');
        let initialUser: AccountLogin | null = null
        if (s) {
            const parsed = JSON.parse(s);
            initialUser = AccountLogin.parse(parsed)
        }
        this.loginSubject = new BehaviorSubject<AccountLogin | null>(initialUser);
        this.loginObservable = this.loginSubject.asObservable();
        this.startRefreshTokenTimer();
    }

    public get loginValue(): AccountLogin | null {
        return this.loginSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/account/login`, { username, password })
            .pipe(map(data => {
                if (data.status === "Ok") {
                    let accountLogin = new AccountLogin(null, data.access_token, data.refresh_token);
                    localStorage.setItem('login', JSON.stringify(accountLogin));
                    this.loginSubject.next(accountLogin);
                    this.updateAccountInfo();
                }
                this.startRefreshTokenTimer();
                return data;
            }));
    }

    async updateAccountInfo() {
        let currentAccount$ = this.http.get<any>(`${environment.apiUrl}/account/current`);
        let emails$ = this.http.get<any>(`${environment.apiUrl}/account/email`);
        combineLatest([currentAccount$, emails$]).subscribe(([currentAccount, emails]) => {
            let accountLogin = this.loginSubject.value;
            if (!accountLogin)
                return;
            let account = new Account(
                currentAccount.id,
                currentAccount.name,
                currentAccount.domain,
                new Date(currentAccount.created_date + " UTC"),
                new Date(currentAccount.virtual_resource_start_date + " UTC"),
                currentAccount.virtual_resource_speed,
                currentAccount.virtual_resource_accrued,
                currentAccount.total_resource_spent);
            accountLogin.account = account;
            account.emails = [];
            emails.emails.forEach(function (email: any) {
                let accountEmail = new AccountEmail(email.email, email.verified, email.primary);
                account.emails.push(accountEmail);
            });

            localStorage.setItem('login', JSON.stringify(accountLogin));
            this.loginSubject.next(accountLogin);
        })
    }

    refresh() {
        this.http.get<any>(`${environment.apiUrl}/account/refresh`).subscribe(
            (data: any) => {
                let accountLogin = this.loginSubject.value;
                if (accountLogin) {
                    accountLogin.access_token = data.access_token;
                    accountLogin.refresh_token = data.refresh_token;
                }
                localStorage.setItem('login', JSON.stringify(accountLogin));
                this.loginSubject.next(accountLogin);
                
                this.startRefreshTokenTimer();
            },
            error => {
              this.logout();
            });
    }

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        if (!this.loginSubject.value)
            return;
        const jwtToken = JSON.parse(atob(this.loginSubject.value.access_token.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);

        this.refreshTokenTimeout = setTimeout(() => this.refresh(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    logout() {
        this.stopRefreshTokenTimer();
        localStorage.removeItem('login');
        this.loginSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(username: string, password: string, email: string) {
        return this.http.post<any>(`${environment.apiUrl}/account/register`, { username, password, email });
    }

    getByName(name: string) {
        return this.http.get<any>(`${environment.apiUrl}/account?name=${name}`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/account?id=${id}`);
    }

    updateEmail(email: string, primary: boolean) {
        return this.http.post(`${environment.apiUrl}/account/email`, { email, primary });
    }

    deleteEmail(email: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {
              email: email
            },
          };
        return this.http.delete(`${environment.apiUrl}/account/email`, options)
    }
}