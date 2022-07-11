import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '@shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoginFormComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LayoutModule {
}
