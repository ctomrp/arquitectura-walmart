import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ComponentsComponent } from './visualizarReporte/components/components.component';
import { ViewDetailProductsComponent } from './components/view-detail-products/view-detail-products.component';

const routes: Routes = [
  {path: 'VisualizarDetalleProducto',component:ViewDetailProductsComponent},
  {path: 'VisualizarReporte', component: ViewProductsComponent },
  {path: 'ObtenerDatosAPI', component: ComponentsComponent },
  { path: '', redirectTo: 'VisualizarReporte', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
