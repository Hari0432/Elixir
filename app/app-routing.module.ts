import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'otplogin',
    pathMatch: 'full'
  },
  {
    path: 'login-landing',
    loadChildren: () => import('./login-landing/login-landing.module').then( m => m.LoginLandingPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then( m => m.BranchPageModule)
  },
  {
    path: 'sync',
    loadChildren: () => import('./sync/sync.module').then( m => m.SyncPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'otplogin',
    loadChildren: () => import('./otplogin/otplogin.module').then( m => m.OtploginPageModule)
  },
  {
    path: 'otpverify',
    loadChildren: () => import('./otpverify/otpverify.module').then( m => m.OtpverifyPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
