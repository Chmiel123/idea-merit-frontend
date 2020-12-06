import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountLogin } from 'src/model/account-login';
import { AccountLoginService } from 'src/services/account.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-account.details',
  templateUrl: './account.details.component.html',
  styleUrls: ['./account.details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountLogin: AccountLogin | null;
  resource: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountLoginService: AccountLoginService
  ) {
    this.accountLogin = this.accountLoginService.accountLoginValue;
    timer(0,5000).subscribe(() => {
      this.resource = this.accountLogin?.account?.available_resource();
    });
  }

  ngOnInit(): void {
  }

}
