import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { carsPageRoutingModule } from './cars-routing.module';

import { carsPage } from './cars.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    IonicModule,
    carsPageRoutingModule
  ],
  declarations: [carsPage]
})
export class carsPageModule {}
