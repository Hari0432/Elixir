import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginLandingPageRoutingModule } from './login-landing-routing.module';

import { LoginLandingPage } from './login-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginLandingPageRoutingModule
  ],
  declarations: [LoginLandingPage]
})
export class LoginLandingPageModule {}
