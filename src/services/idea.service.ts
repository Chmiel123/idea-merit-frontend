import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Idea } from "src/model/idea";
import { AlertService } from "./alert.service";




@Injectable({ providedIn: 'root' })
export class IdeaService {

    private ideaSubject: BehaviorSubject<Idea | null>;
    public ideaObservable: Observable<Idea | null>;

    private ideaArraySubject: BehaviorSubject<Array<Idea>>;
    public ideaArrayObservable: Observable<Array<Idea>>;

    public updateTimerObservable: Observable<number>;

    constructor(
        private http: HttpClient,
        private alertService: AlertService
    ) {
        this.ideaSubject = new BehaviorSubject<Idea | null>(null);
        this.ideaObservable = this.ideaSubject.asObservable();
        this.ideaArraySubject = new BehaviorSubject<Array<Idea>>([]);
        this.ideaArrayObservable = this.ideaArraySubject.asObservable();
        this.updateTimerObservable = timer(0,1000);
    }

    public get ideaValue(): Array<Idea> {
        return this.ideaArraySubject.value;
    }

    getRoots() {
        return this.http.get<any>(`${environment.apiUrl}/idea`)
            .subscribe(data => {
                let ideas: Array<Idea> = [];
                (data as Array<any>).forEach(element => {
                    ideas.push(Idea.parse(element));
                });
                this.ideaArraySubject.next(ideas);
            });
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/idea?id=${id}`)
        .subscribe(data => {
            let idea = Idea.parse(data);
            this.ideaSubject.next(idea);
        });
    }

    getForParent(idea: Idea): Promise<any> {
        return new Promise((resolve, reject) =>{
            this.http.get<any>(`${environment.apiUrl}/idea?parent_id=${idea.id}`)
                .subscribe(data => {
                    let ideas: Array<Idea> = [];
                    (data as Array<any>).forEach(element => {
                        ideas.push(Idea.parse(element));
                    });
                    resolve(ideas);
                });
        });
    }

    createIdea(parent_id: string, name: string, content: string, initial_resource: number) {
        return this.http.post<any>(`${environment.apiUrl}/idea`, { parent_id, name, content, initial_resource });
    }

    async updateIdeaInfo() {
        this.getRoots();
    }

    vote(idea_id: string, resource: number) {
        return this.http.post<any>(`${environment.apiUrl}/idea/vote`, { idea_id, resource });
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