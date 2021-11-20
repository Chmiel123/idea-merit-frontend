import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Idea } from 'src/model/idea';
import { IdeaService } from 'src/services/idea.service';
import { LoginService } from 'src/services/login.service';
import { timer } from 'rxjs';
import { Account } from 'src/model/account';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea?: Idea;
  showChildren: boolean = false;
  showLike: boolean = false;
  children?: Array<Idea>;
  loading: boolean;
  resource_remaining: number | undefined;
  is_alive: boolean | undefined;
  is_root: boolean | undefined;
  
  like_expanded: boolean;
  selected_time: number | undefined;
  @Output('create-idea') createIdeaEvent: EventEmitter<Idea> = new EventEmitter<Idea>();

  constructor(
      private ideaService: IdeaService,
      public loginService: LoginService,
      private alertService: AlertService) {
    this.is_alive = true;
    timer(0,1000).subscribe(() => {
      this.is_alive = this.idea?.is_alive();
      this.is_root = this.idea?.is_root();
      this.resource_remaining = this.idea?.resource_remaining();
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

  setTime(time: number | undefined) {
    this.selected_time = time;
  }
  toggleLike() {
    this.showLike = !this.showLike;
  }
  like() {
    if (this.idea == null || this.selected_time == null) {
      return;
    }
    this.showLike = false;
    this.ideaService.vote(this.idea?.id, this.selected_time)
    .pipe(first())
    .subscribe(
      (data: any) => {
        if (data.status === "Ok") {
          this.alertService.success(data.message, { keepAfterRouteChange: true });
          this.ideaService.updateIdeaInfo();
          //TODO: update idea info
        } else if (data.status === "Error") {
          this.alertService.error(data.message);
        }
      },
      error => {
        this.alertService.error(error);
      });
  }
}
