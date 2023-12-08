import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetail } from './pages/products-detail/products-detail.component';
import { Products } from './pages/products/products.component';
import { Report } from './pages/report/report.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Home } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'detalle-producto',
    component: ProductsDetail,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'reporte', component: Products, canActivate: [AuthGuard] },
  { path: 'data-api', component: Report, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
