import { Component, OnInit } from '@angular/core';

import { AccountLogin } from 'src/model/account-login';
import { Idea } from 'src/model/idea';
import { IdeaService } from 'src/services/idea.service';
import { LoginService } from 'src/services/login.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ideas: Array<Idea>;

  constructor(private ideaService: IdeaService) {
    this.ideas = this.ideaService.ideaValue;
  }

  ngOnInit() {
    this.ideaService.ideaObservable.subscribe(ideas => this.ideas = ideas);
    this.ideaService.getRoots();
  }
}
