import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreatePostFormComponent } from '@shared/components/create-post-form/create-post-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageModalComponent } from './modals/image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatInputModule,
  MatDialogModule
]
const components = [
  CreatePostFormComponent,
  ImageModalComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...material,
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    ...components,
    ...material,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
