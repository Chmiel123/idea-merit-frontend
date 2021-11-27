import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateIdeaComponent } from 'src/app/shared/create-idea/create-idea.component';
import { Idea } from 'src/model/idea';
import { AlertService } from 'src/services/alert.service';
import { IdeaService } from 'src/services/idea.service';

@Component({
  selector: 'app-idea-page',
  templateUrl: './idea-page.component.html',
  styleUrls: ['./idea-page.component.css']
})
export class IdeaPageComponent implements OnInit {
  idea: Idea;
  @ViewChild(CreateIdeaComponent) createIdeaComponent: CreateIdeaComponent;

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private alertService: AlertService,
    private modalService: NgbModal) {
      this.route.params.subscribe( params => {
        if (Object.keys(params).length > 0) {
          this.ideaService.getById(params['id']);
        }
      })
  }

  createIdea(idea: Idea) {
    this.createIdeaComponent.createIdea(idea);
  }

  ngOnInit() {
    this.ideaService.ideaObservable.subscribe(ideas => this.idea = ideas[0]);
  }
}
