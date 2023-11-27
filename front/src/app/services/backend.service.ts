import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Reporte, ReporteVenta, ReporteDetalleProducto } from '../interfaces/Reporte';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = "http://localhost:8000/Reporte/"
  private url2: string = "http://localhost:8000/ReporteVenta/"
  constructor(private http:HttpClient) { }

  //getReporte
getReporte(): Observable<Reporte[]>{
  return this.http.get<Reporte[]>(this.url)
}

postReport(): Observable<Reporte>{
  return this.http.post<Reporte>('http://127.0.0.1:8000/crear_reporte_desde_json/', Observable);
}

obtenerReporteVenta(): Observable<ReporteVenta> {
  return this.http.post<ReporteVenta>('http://127.0.0.1:8000/reporte_venta/', Observable);
}

obtenerReporteDetalleProducto(): Observable<ReporteDetalleProducto> {
  return this.http.post<ReporteDetalleProducto>('http://127.0.0.1:8000/reporte_detalle_producto/', Observable);
}

}
