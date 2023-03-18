import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalledelProductoPage } from './detalledel-producto.page';

const routes: Routes = [
  {
    path: '',
    component: DetalledelProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalledelProductoPageRoutingModule {}
