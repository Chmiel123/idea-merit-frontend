import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.css']
})
export class RichTextComponent implements OnInit {

  private static url_regex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;

  @Input() text?: String;
  spans: Array<Span>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let newText = changes.text.currentValue as String;
    if (newText) {
      let n = newText.length;
      this.spans = [];
      let found = newText.match(RichTextComponent.url_regex);
      this.spans = [];
      if (!found) {
        this.spans.push(new Span(newText, "", "text"));
      }
      if (found) {
        let m = found.length;
        let next = 0;
        for (let j = 0; j < m; j++) {
          let match = found[j];
          let indexOf = newText.indexOf(match)
          this.spans.push(new Span(newText.substr(next, indexOf - next), "", "text"));
          let link = ""
          if (!match.startsWith("http://") && !match.startsWith("https://")) {
            link = "https://"+match;
          }
          this.spans.push(new Span(match, link, "link"));
          next = indexOf + match.length;
        }
        this.spans.push(new Span(newText.substr(next), "", "text"));
      }
    }
  }
}

class Span {
  public text: String;
  public link: String;
  public type: String;

  public constructor(text: String, link: String = "", type: String) {
    this.text = text;
    this.link = link;
    this.type = type;
  }
}