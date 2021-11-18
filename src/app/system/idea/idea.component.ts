import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Idea } from 'src/model/idea';
import { IdeaService } from 'src/services/idea.service';
import { LoginService } from 'src/services/login.service';
import { timer } from 'rxjs';
import { Account } from 'src/model/account';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea?: Idea;
  showChildren: boolean = false;
  children?: Array<Idea>;
  loading: boolean;
  resource_remaining: number | undefined;
  is_alive: boolean;
  @Output('create-idea') createIdeaEvent: EventEmitter<Idea> = new EventEmitter<Idea>();

  constructor(
      private ideaService: IdeaService,
      public loginService: LoginService) {
    this.is_alive = true;
    timer(0,1000).subscribe(() => {
      let resource = this.idea?.resource_remaining();
      if (resource && resource < 0) {
        if (this.idea?.parent_id != null) {
          this.is_alive = false;
        }
      } else {
        this.resource_remaining = resource;
      }
    });
  }

  ngOnInit(): void {
  }

  clickShowChildren(): void {
    if (this.idea) {
      this.showChildren = !this.showChildren;
      if (this.showChildren){
        if (!this.children) {
          this.loading = true;
        }
        this.ideaService.getForParent(this.idea).then((ideas) => {
          this.children = ideas;
          this.loading = false;
        });
      }
    }
  }

  createIdea(idea: Idea | null = null) {
    if (idea) {
      this.createIdeaEvent.emit(idea);
    } else {
      this.createIdeaEvent.emit(this.idea);
    }
  }
}
