import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Idea } from 'src/model/idea';
import { AlertService } from 'src/services/alert.service';
import { IdeaService } from 'src/services/idea.service';

@Component({
  selector: 'create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {

  createIdeaForm: FormGroup;
  createIdeaLoading = false;
  createIdeaSubmitted = false;
  selected_time: number | undefined;
  private parent_idea: Idea;

  @ViewChild('createIdeaModal') public createIdeaModal: TemplateRef<any>;
  
  constructor(
    private ideaService: IdeaService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createIdeaForm = this.formBuilder.group({
      title: '',
      content: ['', Validators.required],
    });
  }

  createIdea(idea: Idea) {
    console.log(idea);

    this.createIdeaForm.reset();
    this.modalService.open(this.createIdeaModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.parent_idea = idea;
      if (this.createIdeaForm.valid) {
        this.onSubmit();
      }
    }, (reason: any) => {
    });
  }

  setTime(time: number | undefined) {
    this.selected_time = time;
  }

  onSubmit() {
    this.createIdeaSubmitted = true;

    if (this.createIdeaForm.invalid || this.selected_time == undefined) {
      return;
    }

    this.ideaService.createIdea(this.parent_idea.id, this.createIdeaForm.controls.title.value, this.createIdeaForm.controls.content.value, this.selected_time)
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
