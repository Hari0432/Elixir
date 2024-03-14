import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtploginPage } from './otplogin.page';

const routes: Routes = [
  {
    path: '',
    component: OtploginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtploginPageRoutingModule {}
