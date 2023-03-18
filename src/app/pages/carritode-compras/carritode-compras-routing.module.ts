import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritodeComprasPage } from './carritode-compras.page';

const routes: Routes = [
  {
    path: '',
    component: CarritodeComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritodeComprasPageRoutingModule {}
