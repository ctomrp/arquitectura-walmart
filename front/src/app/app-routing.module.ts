import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './components/view-products/view-products.component';

const routes: Routes = [
  {path: '', component: ViewProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
