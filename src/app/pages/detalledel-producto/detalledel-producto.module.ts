import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalledelProductoPageRoutingModule } from './detalledel-producto-routing.module';

import { DetalledelProductoPage } from './detalledel-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalledelProductoPageRoutingModule
  ],
  declarations: [DetalledelProductoPage]
})
export class DetalledelProductoPageModule {}
