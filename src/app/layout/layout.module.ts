import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '@shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoginFormComponent,
    CreatePostFormComponent,
    ContentComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class LayoutModule {
}
