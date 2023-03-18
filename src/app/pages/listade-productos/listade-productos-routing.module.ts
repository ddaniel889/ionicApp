import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadeProductosPage } from './listade-productos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadeProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadeProductosPageRoutingModule {}
