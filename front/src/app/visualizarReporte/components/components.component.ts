import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  reporte: any | undefined;
  datosReporteVenta: any | undefined;
  datosReporteDetalleProducto: any | undefined;
  constructor(private backendService:BackendService) {}

  async postReport(){
    try {
      await this.backendService.postReport().subscribe(data=>{
        this.reporte = data
        Swal.fire(
          'Datos Guardados!',
          'Los datos de compra han sido almacenados, ahora puede generar los reportes de hoy',
          'success'
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  async creacionReporteVenta(){
    try{
      await this.backendService.obtenerReporteVenta().subscribe(data => {
        this.datosReporteVenta = data
      })
    } catch (error){
      console.log(error)
    }
  }

  async creacionReporteDetalleVenta(){
    try{
      await this.backendService.obtenerReporteDetalleProducto().subscribe(data => {
        this.datosReporteDetalleProducto = data
      })
    } catch (error){
      console.log(error)
    }
  }

  crearReportes(){
    this.creacionReporteDetalleVenta();
    this.creacionReporteVenta();
  }
}