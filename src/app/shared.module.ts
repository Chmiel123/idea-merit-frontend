import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutofocusDirective } from 'src/helpers/autofocus.directive';
import { TimeResourcePipe } from 'src/helpers/timeResource.pipe';
import { SelectTimeComponent } from './shared/select-time/select-time.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ 
    TimeResourcePipe,
    AutofocusDirective,
    SelectTimeComponent
  ],
  exports: [
    TimeResourcePipe,
    AutofocusDirective,
    SelectTimeComponent
  ]
})
export class SharedModule {}