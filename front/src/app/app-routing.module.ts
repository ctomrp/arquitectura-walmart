import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ComponentsComponent } from './visualizarReporte/components/components.component';

const routes: Routes = [
  {path: '', component: ViewProductsComponent },
  {path: 'components', component: ComponentsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
