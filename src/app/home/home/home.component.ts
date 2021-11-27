import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { CreateIdeaComponent } from 'src/app/shared/create-idea/create-idea.component';

import { AccountLogin } from 'src/model/account-login';
import { Idea } from 'src/model/idea';
import { AlertService } from 'src/services/alert.service';
import { IdeaService } from 'src/services/idea.service';
import { LoginService } from 'src/services/login.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ideas: Array<Idea>;
  @ViewChild(CreateIdeaComponent) createIdeaComponent: CreateIdeaComponent;

  constructor(
    private ideaService: IdeaService,
    private alertService: AlertService,
    private modalService: NgbModal) {
  }

  createIdea(idea: Idea) {
    console.log("createIdea in home component");
    this.createIdeaComponent.createIdea(idea);
  }

  ngOnInit() {
    this.ideaService.ideaObservable.subscribe(ideas => this.ideas = ideas);
    this.ideaService.getRoots();
  }
}
