import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create-post', title: 'Мемолог | Створити', loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule) },
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule) },
  { path: 'best', title: 'Мемолог | Найкраще', data: { sort: 'best' }, loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: 'new', title: 'Мемолог | Свіженьке', data: { sort: 'new' }, loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: '', title: 'Мемолог | Шкварчаще', data: { sort: 'hot' }, loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  // TODO: fix routing,  'https://memologist-prod-be.herokuapp.com/posts/ng-cli-ws' triggers with posts
  { path: '**', redirectTo: '' }
  // { path: 'post/:id', loadChildren: () => import('./post-page/post-page.module').then(m => m.PostPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
