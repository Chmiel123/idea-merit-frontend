import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeResourcePipe } from 'src/helpers/timeResource.pipe';

@Component({
  selector: 'select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.css']
})
export class SelectTimeComponent implements OnInit {

  @Input() buttons: String;
  buttons_objs: Array<TimeButton> = new Array<TimeButton>();
  is_custom_time_selected: boolean = false;
  @Output('time') timeSelectedEvent: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();
  private timeResourcePipe: TimeResourcePipe;

  constructor() {
      this.timeResourcePipe = new TimeResourcePipe();
  }

  ngOnInit(): void {
    this.buttons.split(",").forEach(x => {
      this.buttons_objs.push(new TimeButton(Number(x)));
    });
  }

  clicked(button: TimeButton) {
    this.buttons_objs.forEach(element => {
      element.is_selected = false;
    });
    this.is_custom_time_selected = false;
    button.is_selected = true;
    this.timeSelectedEvent.emit(button.time);
  }

  changeCustomTime(event: any) {
    this.buttons_objs.forEach(element => {
      element.is_selected = false;
    });
    this.is_custom_time_selected = true;
    let number = this.timeResourcePipe.reverse_transform(event.target.value);
    event.target.value = this.timeResourcePipe.transform(number);
    this.timeSelectedEvent.emit(number);
  }
}
class TimeButton {
  time: number;
  is_selected: boolean = false;

  constructor(time: number) {
    this.time = time;
  }
}