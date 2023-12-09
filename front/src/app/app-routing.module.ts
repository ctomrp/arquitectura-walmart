import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetail } from './pages/products-detail/products-detail.component';
import { Products } from './pages/products/products.component';
import { Report } from './pages/report/report.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Home } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { hasRoleGuard } from './has-role.guard';

const routes: Routes = [
  {
    path: 'detalle-producto',
    component: ProductsDetail,
    canActivate: [AuthGuard,hasRoleGuard],data:{group:'Supervisor'},
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'register', component: Register },
  { path: 'home', component: Home},
  { path: 'reporte', component: Products, canActivate: [AuthGuard,hasRoleGuard],data:{group:'Supervisor'} },
  { path: 'data-api', component: Report, canActivate: [AuthGuard,hasRoleGuard],data:{group:'Analista'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
