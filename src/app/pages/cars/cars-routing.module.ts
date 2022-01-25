import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { carsPage } from './cars.page';

const routes: Routes = [
  {
    path: '',
    component: carsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class carsPageRoutingModule {}
