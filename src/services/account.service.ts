import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Account } from 'src/model/account';
import { AccountLogin } from 'src/model/account-login';


@Injectable({ providedIn: 'root' })
export class AccountLoginService {
    private accountLoginSubject: BehaviorSubject<AccountLogin | null>;
    public accountLogin: Observable<AccountLogin | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        let s = localStorage.getItem('accountLogin');
        let initialUser : AccountLogin | null = null
        if (s) {
            initialUser = JSON.parse(s);
        }
        this.accountLoginSubject = new BehaviorSubject<AccountLogin | null>(initialUser);
        this.accountLogin = this.accountLoginSubject.asObservable();
    }

    public get accountLoginValue(): AccountLogin | null {
        return this.accountLoginSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<AccountLogin>(`${environment.apiUrl}/account/login`, { username, password })
            .pipe(map(accountLogin => {
                // store accountLogin details and jwt token in local storage to keep accountLogin logged in between page refreshes
                localStorage.setItem('accountLogin', JSON.stringify(accountLogin));
                this.accountLoginSubject.next(accountLogin);
                return accountLogin;
            }));
    }

    logout() {
        // remove accountLogin from local storage and set current accountLogin to null
        localStorage.removeItem('accountLogin');
        this.accountLoginSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(username: string, password: string) {
        return this.http.post(`${environment.apiUrl}/account/register`, { username, password });
    }

    getByName(name: string) {
        return this.http.get<Account[]>(`${environment.apiUrl}/account?name=${name}`);
    }

    getById(id: string) {
        return this.http.get<Account>(`${environment.apiUrl}/account?id=${id}`);
    }

    // update(id, params) {
    //     return this.http.put(`${environment.apiUrl}/accountLogins/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored accountLogin if the logged in accountLogin updated their own record
    //             if (id == this.accountLoginValue.id) {
    //                 // update local storage
    //                 const accountLogin = { ...this.accountLoginValue, ...params };
    //                 localStorage.setItem('accountLogin', JSON.stringify(accountLogin));

    //                 // publish updated accountLogin to subscribers
    //                 this.accountLoginSubject.next(accountLogin);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/accountLogins/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in accountLogin deleted their own record
    //             if (id == this.accountLoginValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}