import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  createIdeaForm: FormGroup;
  createIdeaLoading = false;
  createIdeaSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.ideaService.ideaObservable.subscribe(ideas => this.ideas = ideas);
    this.ideaService.getRoots();

    this.createIdeaForm = this.formBuilder.group({
      title: ['', null],
      content: ['', Validators.required]
    });
  }

  createIdea(idea: Idea, content: any) {
    console.log("create subidea of: "+idea.name);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      if (this.createIdeaForm.valid) {
        this.onSubmit();
      }
    }, (reason: any) => {
    });
  }

  onSubmit() {
    this.createIdeaSubmitted = true;
    console.log(this.createIdeaForm);

    // stop here if form is invalid
    if (this.createIdeaForm.invalid) {
      return;
    }
    //TODO: create idea
  }
}
