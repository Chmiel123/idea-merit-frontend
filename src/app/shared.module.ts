import { NgModule } from '@angular/core';
import { AutofocusDirective } from 'src/helpers/autofocus.directive';
import { TimeResourcePipe } from 'src/helpers/timeResource.pipe';

@NgModule({
  declarations: [ 
    TimeResourcePipe,
    AutofocusDirective
  ],
  exports: [
    TimeResourcePipe,
    AutofocusDirective
  ]
})
export class SharedModule {}