import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ComponentsComponent } from './visualizarReporte/components/components.component';
import { ViewDetailProductsComponent } from './components/view-detail-products/view-detail-products.component'
@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    ComponentsComponent,
    ViewDetailProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
