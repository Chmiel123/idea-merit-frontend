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
export class AccountService {

    private accountsSubject: BehaviorSubject<{ [id: string] : Account; } | null>;
    public accountsObservable: Observable<{ [id: string] : Account; } | null>;

    private account_dictionary: { [id: string] : Account; } = {};

    constructor(
        private http: HttpClient
        ) {

        this.accountsSubject = new BehaviorSubject<{ [id: string] : Account; } | null>({});
        this.accountsObservable = this.accountsSubject.asObservable();
    }

    get(account_id: string) {
        if (this.accountsSubject && this.accountsSubject.value) {
            let dictionary = this.accountsSubject.value
            if (account_id in this.accountsSubject.value) {
                return this.accountsSubject.value[account_id];
            } else {
                this.http.get<any>(`${environment.apiUrl}/account?id=${account_id}`).subscribe((data: any) => {
                    let account = Account.parse(data);
                    dictionary[account_id] = account;
                    this.accountsSubject.next(dictionary);
                })
            }
        }
        return null;
    }
}
