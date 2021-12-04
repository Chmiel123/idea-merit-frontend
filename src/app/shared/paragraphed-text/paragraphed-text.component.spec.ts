import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphedTextComponent } from './paragraphed-text.component';

describe('ParagraphedTextComponent', () => {
  let component: ParagraphedTextComponent;
  let fixture: ComponentFixture<ParagraphedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphedTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
