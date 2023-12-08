import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Products } from './pages/products/products.component';
import { ProductsDetail } from './pages/products-detail/products-detail.component';
import { Report } from './pages/report/report.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Home } from './pages/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    Home,
    Login,
    Products,
    ProductsDetail,
    Register,
    Report,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
