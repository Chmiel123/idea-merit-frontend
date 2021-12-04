import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.css']
})
export class RichTextComponent implements OnInit {

  private static url_regex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;

  @Input() text?: String;
  paragraphs: Array<String>;
  spans: Array<Array<Span>>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let newText = changes.text.currentValue as String;
    if (newText) {
      let paragraphs = this.removeConsecutiveDuplicates(newText, "\n").split("\n");
      let n = paragraphs.length;
      this.spans = [];
      for (let i = 0; i < n; i++) {
        let found = paragraphs[i].match(RichTextComponent.url_regex);
        this.spans[i] = [];
        if (!found) {
          this.spans[i].push(new Span(paragraphs[i], "", "text"));
        }
        if (found) {
          let m = found.length;
          let next = 0;
          for (let j = 0; j < m; j++) {
            let match = found[j];
            let indexOf = paragraphs[i].indexOf(match)
            this.spans[i].push(new Span(paragraphs[i].substr(next, indexOf - next), "", "text"));
            let link = ""
            if (!match.startsWith("http://") && !match.startsWith("https://")) {
              link = "http://"+match;
            }
            this.spans[i].push(new Span(match, link, "link"));
            next = indexOf + match.length;
          }
          this.spans[i].push(new Span(paragraphs[i].substr(next), "", "text"));
        }
      }
    }
  }

  private removeConsecutiveDuplicates(input: String, checkedCharacter: String): String
  {
    let n = input.length;
    let str = "";
    // We don't need to do anything for
    // empty string.
    if (n == 0)
      return str;

    // Traversing string
    for (let i = 0; i < n - 1; i++) {
      //checking if s[i] is not same as s[i+1] then add it into str
      if (input[i] != input[i + 1] || input[i] != checkedCharacter) {
        str += input[i];
      }
    }
    //Since the last character will not be inserted in the loop we add it at the end
      
    str += input[n-1];
    return str;
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