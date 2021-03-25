import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountLoginService } from 'src/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountLoginService: AccountLoginService
  ) { }
}
