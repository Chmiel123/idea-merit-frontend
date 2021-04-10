import { Component, Input, OnInit } from '@angular/core';
import { Idea } from 'src/model/idea';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea?: Idea;

  constructor() { }

  ngOnInit(): void {
  }

}
