import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

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

  createIdeaForm: FormGroup;
  createIdeaLoading = false;
  createIdeaSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService,
    private alertService: AlertService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.ideaService.ideaObservable.subscribe(ideas => this.ideas = ideas);
    this.ideaService.getRoots();

    this.createIdeaForm = this.formBuilder.group({
      title: '',
      content: ['', Validators.required],
      life: '',
      customLife: ''
    });
  }

  createIdea(idea: Idea, content: any) {
    console.log("create subidea of: "+idea.name);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.parent_idea = idea;
      if (this.createIdeaForm.valid) {
        this.onSubmit();
      }
    }, (reason: any) => {
    });
  }

  private parent_idea: Idea;

  onSubmit() {
    this.createIdeaSubmitted = true;
    console.log(this.createIdeaForm);

    // stop here if form is invalid
    if (this.createIdeaForm.invalid) {
      return;
    }
    //TODO: create idea
    let initial_resource = 0;
    if (this.createIdeaForm.controls.customLife.value) {
      initial_resource = this.createIdeaForm.controls.customLife.value;
    } else {
      initial_resource = this.createIdeaForm.controls.life.value;
    }
    this.ideaService.createIdea(this.parent_idea.id, this.createIdeaForm.controls.title.value, this.createIdeaForm.controls.content.value, initial_resource)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === "Ok") {
            this.alertService.success(data.message, { keepAfterRouteChange: true });
            this.ideaService.updateIdeaInfo();
            //TODO: update account info
          } else if (data.status === "Error") {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error);
        });
  }
}
