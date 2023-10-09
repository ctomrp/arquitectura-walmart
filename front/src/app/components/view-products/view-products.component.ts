import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {
  reporte: any | undefined
  constructor(private backendService:BackendService ){}

  getReporteApi(){
    this.backendService.getReporte().subscribe(data=>{
      this.reporte = data
    })
  }

  postReport(){
    this.backendService.postReport().subscribe(data=>{
      this.reporte = data
    })
  }
}
