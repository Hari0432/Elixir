import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLandingPage } from './login-landing.page';

const routes: Routes = [
  {
    path: '',
    component: LoginLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginLandingPageRoutingModule {}
