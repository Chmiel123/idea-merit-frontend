import { NgModule } from '@angular/core';
import { TimeResourcePipe } from 'src/helpers/timeResource.pipe';

@NgModule({
  declarations: [ 
    TimeResourcePipe
  ],
  exports: [
    TimeResourcePipe
  ]
})
export class SharedModule {}