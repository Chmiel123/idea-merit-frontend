import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Idea } from "src/model/idea";
import { AlertService } from "./alert.service";




@Injectable({ providedIn: 'root' })
export class IdeaService {

    private ideaSubject: BehaviorSubject<Array<Idea>>;
    public ideaObservable: Observable<Array<Idea>>;

    constructor(
        private http: HttpClient,
        private alertService: AlertService
    ) {
        this.ideaSubject = new BehaviorSubject<Array<Idea>>([]);
        this.ideaObservable = this.ideaSubject.asObservable();
    }

    public get ideaValue(): Array<Idea> {
        return this.ideaSubject.value;
    }

    getRoots() {
        return this.http.get<any>(`${environment.apiUrl}/idea`)
            .subscribe(data => {
                let ideas: Array<Idea> = data;
                this.ideaSubject.next(ideas);
            });
    }

    getForParent(idea: Idea): Promise<any> {
        return new Promise((resolve, reject) =>{
            this.http.get<any>(`${environment.apiUrl}/idea?parent_id=${idea.id}`)
                .subscribe(data => {
                    let ideas: Array<Idea> = data;
                    resolve(ideas);
                });
        });
    }

    // async updateAccountInfo() {
    //     let currentAccount$ = this.http.get<any>(`${environment.apiUrl}/account/current`);
    //     let emails$ = this.http.get<any>(`${environment.apiUrl}/account/email`);
    //     combineLatest([currentAccount$, emails$]).subscribe(([currentAccount, emails]) => {
    //         let accountLogin = this.loginSubject.value;
    //         if (!accountLogin)
    //             return;
    //         let account = new Account(
    //             currentAccount.id,
    //             currentAccount.name,
    //             currentAccount.domain,
    //             new Date(currentAccount.created_date + " UTC"),
    //             new Date(currentAccount.virtual_resource_start_date + " UTC"),
    //             currentAccount.virtual_resource_speed,
    //             currentAccount.virtual_resource_accrued,
    //             currentAccount.total_resource_spent);
    //         accountLogin.account = account;
    //         account.emails = [];
    //         emails.emails.forEach(function (email: any) {
    //             let accountEmail = new AccountEmail(email.email, email.verified, email.primary);
    //             account.emails.push(accountEmail);
    //         });

    //         localStorage.setItem('login', JSON.stringify(accountLogin));
    //         this.loginSubject.next(accountLogin);
    //     })
    // }

}