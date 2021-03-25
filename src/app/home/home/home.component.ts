import { Component, OnInit } from '@angular/core';

import { AccountLogin } from 'src/model/account-login';
import { AccountLoginService } from 'src/services/login.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  accountLogin: AccountLogin | null;

  constructor(private accountLoginService: AccountLoginService) {
      this.accountLogin = this.accountLoginService.accountLoginValue;
  }
}
