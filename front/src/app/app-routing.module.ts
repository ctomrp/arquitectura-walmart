import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Products } from './pages/products/products.component';
import { ProductsDetail } from './pages/products-detail/products-detail.component';
import { Report } from './pages/report/report.component';

const routes: Routes = [
  { path: 'VisualizarDetalleProducto', component: ProductsDetail },
  { path: 'VisualizarReporte', component: Products },
  { path: 'ObtenerDatosAPI', component: Report },
  { path: '', redirectTo: 'VisualizarReporte', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
