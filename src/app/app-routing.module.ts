import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista-de-productos',
    loadChildren: () => import('./pages/listade-productos/listade-productos.module').then( m => m.ListadeProductosPageModule)
  },
  {
    path: 'detalle-del-producto/:id',
    loadChildren: () => import('./pages/detalledel-producto/detalledel-producto.module').then( m => m.DetalledelProductoPageModule)
  },
  {
    path: 'carrito-de-compras',
    loadChildren: () => import('./pages/carritode-compras/carritode-compras.module').then( m => m.CarritodeComprasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
