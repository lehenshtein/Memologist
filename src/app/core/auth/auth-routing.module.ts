import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@app/core/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', title: 'Мемолог | Увійти', component: AuthComponent },
  { path: 'sign-up', title: 'Мемолог | Зареєструватися', component: AuthComponent },
  { path: 'verification/:code', title: 'Мемолог | Верифікація', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
