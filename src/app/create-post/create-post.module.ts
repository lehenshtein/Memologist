import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    SharedModule
  ]
})
export class CreatePostModule { }
