import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/home/home/home.component';
import { AuthGuard } from 'src/helpers/auth.guard';
import { AboutComponent } from './home/about/about.component';
import { IdeaPageComponent } from './home/idea-page/idea-page.component';

const accountModule = () => import('src/app/account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'idea/:id', component: IdeaPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', loadChildren: accountModule },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
