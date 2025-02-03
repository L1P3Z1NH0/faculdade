import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/public/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register-user',
    loadChildren: () =>
      import('./views/public/register-user/register-user.module').then(
        (m) => m.RegisterUserModule
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/private/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user-details',
        loadChildren: () =>
          import('./views/private/user-details/user-details.module').then(
            (m) => m.UserDetailsModule
          ),
      },
      {
        path: 'actions',
        loadChildren: () =>
          import('./views/private/actions/actions.module').then(
            (m) => m.ActionsModule
          ),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./views/public/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      { path: '**', redirectTo: '/not-found' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
