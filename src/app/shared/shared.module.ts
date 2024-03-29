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
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageModalComponent } from './modals/image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignInFormComponent } from '@shared/components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '@shared/components/sign-up-form/sign-up-form.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NotificationServiceComponent } from '@shared/components/notification-service/notification-service.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  VerificationEmailFormComponent
} from '@shared/components/verification-email-form/verification-email-form.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PostFormComponent } from '@shared/components/post-form/post-form.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SafePipe } from '@shared/pipes/safe-pipe.pipe';
import { FileToImgPipe } from '@shared/pipes/file-to-img.pipe';
import { SearchComponent } from './components/search/search.component';
import { MatBadgeModule } from '@angular/material/badge';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatInputModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatDividerModule,
  MatMenuModule,
  MatTooltipModule,
  MatSlideToggleModule,
  NgxMatFileInputModule,
  MatBadgeModule
]
const components = [
  PostFormComponent,
  SignInFormComponent,
  SignUpFormComponent,
  ImageModalComponent,
  VerificationEmailFormComponent,
  ConfirmModalComponent,
  SearchComponent
]

@NgModule({
  declarations: [
    NotificationServiceComponent,
    ...components,
    SafePipe,
    FileToImgPipe,
  ],
  imports: [
    ...material,
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule
  ],
  exports: [
    ...components,
    ...material,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule
  ]
})
export class SharedModule { }
