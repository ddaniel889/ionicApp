import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadeProductosPageRoutingModule } from './listade-productos-routing.module';
import { FiltersPipe } from '../../pipe/filters.pipe';

import { ListadeProductosPage } from './listade-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadeProductosPageRoutingModule
  ],
  declarations: [ListadeProductosPage,FiltersPipe]
})
export class ListadeProductosPageModule {}
