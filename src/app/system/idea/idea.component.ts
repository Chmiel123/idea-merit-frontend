import { Component, Input, OnInit } from '@angular/core';
import { Idea } from 'src/model/idea';
import { IdeaService } from 'src/services/idea.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea?: Idea;
  showChildren?: boolean = false;
  children?: Array<Idea>;

  constructor(private ideaService: IdeaService) {
  }

  ngOnInit(): void {
  }

  clickShowChildren(): void {
    if (this.idea) {
      this.showChildren = !this.showChildren;
      if (this.showChildren){
        this.ideaService.getForParent(this.idea).then((ideas) => {
          this.children = ideas
        });
      }
    }
  }
}
