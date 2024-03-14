import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpverifyPageRoutingModule } from './otpverify-routing.module';

import { OtpverifyPage } from './otpverify.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpverifyPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [OtpverifyPage]
})
export class OtpverifyPageModule {}
