import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteVenta, ReporteDetalleProducto } from '../interfaces/Reportes';
import { Producto } from '../interfaces/Producto';
import { Sucursal } from '../interfaces/Sucursal';
import { GrupoProducto } from '../interfaces/GrupoProducto';
import { Compra } from '../interfaces/Compra';
import { User } from '../interfaces/User';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private urlReporte: string = 'http://127.0.0.1:8000/reporte_venta/';
  private urlReporteDetalle: string =
    'http://127.0.0.1:8000/reporte_detalle_producto/';
  private urlProducto: string = '';
  private urlProductoGet: string = 'http://127.0.0.1:8000/Producto/';
  private urlSucursal: string = '';
  private urlSucursalGet: string = 'http://127.0.0.1:8000/Sucursal/';
  private urlCompra: string = '';
  private urlCompraGet: string = 'http://127.0.0.1:8000/Compra/';
  private urlGrupoProducto: string = '';
  private urlGrupoProductoGet: string = 'http://127.0.0.1:8000/GrupoProducto/';
  private urlUser: string = 'http://127.0.0.1:8000/User/';

  constructor(private http: HttpClient) {}

  // //Crear Reporte de json
  postReport(): Observable<Compra> {
    return this.http.post<Compra>(
      'http://127.0.0.1:8000/crear_reporte_desde_json/',
      Observable
    );
  }

  //Obtener Reporte
  getReporteVenta(): Observable<ReporteVenta[]> {
    return this.http.get<ReporteVenta[]>(this.urlReporte);
  }
  //Actulizar Reporte
  updateReporteVenta(id: number, Reporte: any): Observable<ReporteVenta> {
    const urlReporte = `${this.urlReporte}${id}/`;
    return this.http.put<ReporteVenta>(urlReporte, Reporte);
  }
  //Eliminar Reporte
  deleteReporteVenta(id: number): Observable<ReporteVenta> {
    const urlReporte = `${this.urlReporte}${id}/`;
    return this.http.delete<ReporteVenta>(urlReporte);
  }

  //Obtener Reporte Detalle Producto
  GetReporteDetalleProducto(): Observable<ReporteDetalleProducto[]> {
    return this.http.get<ReporteDetalleProducto[]>(this.urlReporteDetalle);
  }
  //Actualizar Reporte Detalle Producto
  updateReporteDetalleProducto(
    id: number,
    Reporte: any
  ): Observable<ReporteDetalleProducto> {
    const urlReporte = `${this.urlReporteDetalle}${id}/`;
    return this.http.put<ReporteDetalleProducto>(urlReporte, Reporte);
  }
  //Eliminar Reporte Detalle Producto
  deleteReporteDetalleProducto(id: number): Observable<ReporteDetalleProducto> {
    const urlReporte = `${this.urlReporteDetalle}${id}/`;
    return this.http.delete<ReporteDetalleProducto>(urlReporte);
  }

  //Crear Producto
  postProducto(): Observable<Producto> {
    return this.http.post<Producto>(this.urlProducto, Observable);
  }
  //Obtener Producto
  getProducto(): Observable<Producto> {
    return this.http.get<Producto>(this.urlProductoGet);
  }
  //Actualizar Producto
  updateProducto(id: number, Producto: any): Observable<Producto> {
    const urlProducto = `${this.urlProducto}${id}/`;
    return this.http.put<Producto>(urlProducto, Producto);
  }
  //Eliminar Producto
  deleteProducto(id: number): Observable<Producto> {
    const urlProducto = `${this.urlProducto}${id}/`;
    return this.http.delete<Producto>(urlProducto);
  }

  //Crear Sucursal
  postSucursal(): Observable<Sucursal> {
    return this.http.post<Sucursal>(this.urlSucursal, Observable);
  }
  //Obtener Sucursal
  getSucursal(): Observable<Sucursal> {
    return this.http.get<Sucursal>(this.urlSucursalGet);
  }
  //Actualizar Sucursal
  updateSucursal(id: number, Sucursal: any): Observable<Sucursal> {
    const urlSucursal = `${this.urlSucursal}${id}/`;
    return this.http.put<Sucursal>(urlSucursal, Sucursal);
  }
  //Eliminar Sucursal
  deleteSucursal(id: number): Observable<Sucursal> {
    const urlSucursal = `${this.urlSucursal}${id}/`;
    return this.http.delete<Sucursal>(urlSucursal);
  }

  //Crear Grupo Producto
  postGrupoProducto(): Observable<GrupoProducto> {
    return this.http.post<GrupoProducto>(this.urlGrupoProducto, Observable);
  }
  //Obtener Grupo Producto
  getGrupoProducto(): Observable<GrupoProducto> {
    return this.http.get<GrupoProducto>(this.urlGrupoProductoGet);
  }
  //Actualizar Grupo Producto
  updateGrupoProducto(
    id: number,
    GrupoProducto: any
  ): Observable<GrupoProducto> {
    const urlGrupoProducto = `${this.urlGrupoProducto}${id}/`;
    return this.http.put<GrupoProducto>(urlGrupoProducto, GrupoProducto);
  }
  //Eliminar Grupo Producto
  deleteGrupoProducto(id: number): Observable<GrupoProducto> {
    const urlGrupoProducto = `${this.urlGrupoProducto}${id}/`;
    return this.http.delete<GrupoProducto>(urlGrupoProducto);
  }

  //Crear Compra
  postCompra(): Observable<Compra> {
    return this.http.post<Compra>(this.urlCompra, Observable);
  }
  //Obtener Compra
  getCompra(): Observable<Compra> {
    return this.http.get<Compra>(this.urlCompraGet);
  }
  //Actualizar Compra
  updateCompra(id: number, Compra: any): Observable<Compra> {
    const urlCompra = `${this.urlCompra}${id}/`;
    return this.http.put<Compra>(urlCompra, Compra);
  }
  //Eliminar Compra
  deleteCompra(id: number): Observable<Compra> {
    const urlCompra = `${this.urlCompra}${id}/`;
    return this.http.delete<Compra>(urlCompra);
  }

  //Crear User
  postUser(): Observable<User> {
    return this.http.post<User>(this.urlUser, Observable);
  }
  //Obtener User
  getUser(): Observable<User> {
    return this.http.get<User>(this.urlUser);
  }
  //Actualizar User
  updateUser(id: number, User: any): Observable<User> {
    const urlUser = `${this.urlUser}${id}/`;
    return this.http.put<User>(urlUser, User);
  }
  //Eliminar User
  deleteUser(id: number): Observable<User> {
    const urlUser = `${this.urlUser}${id}/`;
    return this.http.delete<User>(urlUser);
  }
}
