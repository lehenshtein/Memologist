import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ContentComponent } from '@app/main/content/content.component';
import { PostPageComponent } from '@app/main/post-page/post-page.component';
import { PostResolver } from '@app/main/post-page/post.resolver';

const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: '', component: ContentComponent },
      { path: ':id', component: PostPageComponent, resolve: {data: PostResolver} }
    ]
  },
  // { path: ':id', component: PostPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
