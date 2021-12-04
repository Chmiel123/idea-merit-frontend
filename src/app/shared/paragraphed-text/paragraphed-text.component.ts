import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paragraphed-text',
  templateUrl: './paragraphed-text.component.html',
  styleUrls: ['./paragraphed-text.component.css']
})
export class ParagraphedTextComponent implements OnInit {

  @Input() text?: String;
  paragraphs: Array<String>;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let newText = changes.text.currentValue as String;
    if (newText) {
      this.paragraphs = this.removeConsecutiveDuplicates(newText, "\n").split("\n");
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
