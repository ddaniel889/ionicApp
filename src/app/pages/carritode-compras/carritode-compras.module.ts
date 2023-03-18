import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritodeComprasPageRoutingModule } from './carritode-compras-routing.module';

import { CarritodeComprasPage } from './carritode-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritodeComprasPageRoutingModule
  ],
  declarations: [CarritodeComprasPage]
})
export class CarritodeComprasPageModule {}
