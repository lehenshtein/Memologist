import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ContentComponent } from '@app/main/content/content.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  exports: [
    ContentComponent
  ]
})
export class MainModule { }
