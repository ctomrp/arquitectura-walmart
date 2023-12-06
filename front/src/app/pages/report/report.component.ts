import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class Report {
  reporte: any | undefined;
  datosReporteVenta: any | undefined;
  datosReporteDetalleProducto: any | undefined;
  constructor(private backendService: BackendService) {}

  async postReport() {
    try {
      await this.backendService.postReport().subscribe((data) => {
        this.reporte = data;
        Swal.fire(
          'Datos Guardados!',
          'Los datos de compra han sido almacenados, ahora puede generar los reportes de hoy',
          'success'
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  crearReportes() {
    Swal.fire(
      'Reportes Creados!',
      'El reporte Venta y Detalle Producto han sidos creados exitosamente',
      'success'
    );
  }
}
