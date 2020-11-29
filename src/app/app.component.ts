import { Component } from '@angular/core';
import { AccountLogin } from 'src/model/account-login';
import { Account } from 'src/model/account';
import { AccountLoginService } from 'src/services/account.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loggedAccount: AccountLogin | null = null;

  constructor(private accountLoginService: AccountLoginService) {
    this.accountLoginService.accountLogin.subscribe(x => this.loggedAccount = x);
  }

  logout() {
    this.accountLoginService.logout();
  }
}
