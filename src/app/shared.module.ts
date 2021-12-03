import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutofocusDirective } from 'src/helpers/autofocus.directive';
import { TimeResourcePipe } from 'src/helpers/timeResource.pipe';
import { SelectTimeComponent } from './shared/select-time/select-time.component';
import { CreateIdeaComponent } from './shared/create-idea/create-idea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RichTextComponent } from './shared/rich-text/rich-text.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    TimeResourcePipe,
    AutofocusDirective,
    SelectTimeComponent,
    CreateIdeaComponent,
    RichTextComponent
  ],
  exports: [
    TimeResourcePipe,
    AutofocusDirective,
    SelectTimeComponent,
    CreateIdeaComponent,
    RichTextComponent
  ]
})
export class SharedModule {}