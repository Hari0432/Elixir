import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtploginPageRoutingModule } from './otplogin-routing.module';

import { OtploginPage } from './otplogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtploginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OtploginPage]
})
export class OtploginPageModule {}
