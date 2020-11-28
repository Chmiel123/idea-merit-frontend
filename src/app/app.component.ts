import { Component } from '@angular/core';
import { Account } from '../model/account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'idea-merit-frontend';
  loggedAccount: Account | null = null;
}
