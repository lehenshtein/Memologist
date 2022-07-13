import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create-post', loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule) },
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  // { path: 'post/:id', loadChildren: () => import('./post-page/post-page.module').then(m => m.PostPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
