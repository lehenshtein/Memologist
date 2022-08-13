import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ContentComponent } from '@app/main/content/content.component';
import { SharedModule } from '@shared/shared.module';
import { PostPageComponent } from './post-page/post-page.component';
import { PostCardComponent } from './post-card/post-card.component';
// import { PostResolver } from '@app/main/post.resolver';

@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
    PostPageComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  // providers: [
  //   PostResolver
  // ],
  exports: [
    ContentComponent,
    PostCardComponent
  ]
})
export class MainModule { }
