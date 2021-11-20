import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared.module';

import { SelectTimeComponent } from './select-time.component';

describe('SelectTimeComponent', () => {
  let component: SelectTimeComponent;
  let fixture: ComponentFixture<SelectTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTimeComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTimeComponent);
    component = fixture.componentInstance;
    component.buttons = "1,2,3,4";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
