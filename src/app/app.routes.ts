import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'find-the-diamond',
    loadComponent: () => import('./find-the-diamond/find-the-diamond.page').then( m => m.FindTheDiamondPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'guess-the-way',
    loadComponent: () => import('./guess-the-way/guess-the-way.page').then( m => m.GuessTheWayPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'debts',
    loadComponent: () => import('./debts/debts.page').then( m => m.DebtsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'loans',
    loadComponent: () => import('./loans/loans.page').then( m => m.LoansPage),
    canActivate: [AuthGuard]
  },
];
