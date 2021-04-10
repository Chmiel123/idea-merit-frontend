import { Component } from '@angular/core';
import { AccountLogin } from 'src/model/account-login';
import { Account } from 'src/model/account';
import { LoginService } from 'src/services/login.service'
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  accountLogin: AccountLogin | null = null;
  resource: number | undefined;

  constructor(private accountLoginService: LoginService) {
    this.accountLoginService.loginObservable.subscribe(x => this.accountLogin = x);
    timer(0,1000).subscribe(() => {
      this.resource = this.accountLogin?.account?.available_resource();
    });
  }

  logout() {
    this.accountLoginService.logout();
  }
}
