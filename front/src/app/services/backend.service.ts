import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  private baseUrl: string = 'http://127.0.0.1:8000/';
  private createReportUrl: string = 'crear_reporte_desde_json/';
  private urlReporte: string = 'reporte_venta/';
  private urlReporteDetalle: string = 'reporte_detalle_producto/';
  private urlProducto: string = 'Producto/';
  private urlSucursal: string = 'Sucursal/';
  private urlCompra: string = 'Compra/';
  private urlGrupoProducto: string = 'GrupoProducto/';
  private urlUser: string = 'User/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Obtener el token de autenticación almacenado (ajusta esto según tu implementación)
    const token = localStorage.getItem('token');

    // Configurar las cabeceras de la solicitud con el token de autenticación
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }

  // Crear Reporte de JSON
  postReport(): Observable<Compra> {
    return this.http
      .post<Compra>(`${this.baseUrl}${this.createReportUrl}`, Observable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener Reporte
  getReporteVenta(): Observable<ReporteVenta[]> {
    return this.http
      .get<ReporteVenta[]>(`${this.baseUrl}${this.urlReporte}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Actualizar Reporte
  updateReporteVenta(id: number, Reporte: any): Observable<ReporteVenta> {
    return this.http
      .put<ReporteVenta>(`${this.baseUrl}${this.urlReporte}${id}/`, Reporte, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Eliminar Reporte
  deleteReporteVenta(id: number): Observable<ReporteVenta> {
    return this.http
      .delete<ReporteVenta>(`${this.baseUrl}${this.urlReporte}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener Reporte Detalle Producto
  getReporteDetalleProducto(): Observable<ReporteDetalleProducto[]> {
    return this.http
      .get<ReporteDetalleProducto[]>(
        `${this.baseUrl}${this.urlReporteDetalle}`,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Actualizar Reporte Detalle Producto
  updateReporteDetalleProducto(
    id: number,
    Reporte: any
  ): Observable<ReporteDetalleProducto> {
    return this.http
      .put<ReporteDetalleProducto>(
        `${this.baseUrl}${this.urlReporteDetalle}${id}/`,
        Reporte,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  // Eliminar Reporte Detalle Producto
  deleteReporteDetalleProducto(id: number): Observable<ReporteDetalleProducto> {
    return this.http
      .delete<ReporteDetalleProducto>(
        `${this.baseUrl}${this.urlReporteDetalle}${id}/`,
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Crear Producto
  postProducto(): Observable<Producto> {
    return this.http
      .post<Producto>(`${this.baseUrl}${this.urlProducto}`, Observable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener Producto
  getProducto(): Observable<Producto> {
    return this.http
      .get<Producto>(`${this.baseUrl}${this.urlProducto}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar Producto
  updateProducto(id: number, Producto: any): Observable<Producto> {
    return this.http
      .put<Producto>(`${this.baseUrl}${this.urlProducto}${id}/`, Producto, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Eliminar Producto
  deleteProducto(id: number): Observable<Producto> {
    return this.http
      .delete<Producto>(`${this.baseUrl}${this.urlProducto}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Crear Sucursal
  postSucursal(): Observable<Sucursal> {
    return this.http
      .post<Sucursal>(`${this.baseUrl}${this.urlSucursal}`, Observable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener Sucursal
  getSucursal(): Observable<Sucursal> {
    return this.http
      .get<Sucursal>(`${this.baseUrl}${this.urlSucursal}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar Sucursal
  updateSucursal(id: number, Sucursal: any): Observable<Sucursal> {
    return this.http
      .put<Sucursal>(`${this.baseUrl}${this.urlSucursal}${id}/`, Sucursal, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Eliminar Sucursal
  deleteSucursal(id: number): Observable<Sucursal> {
    return this.http
      .delete<Sucursal>(`${this.baseUrl}${this.urlSucursal}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Crear Grupo Producto
  postGrupoProducto(): Observable<GrupoProducto> {
    return this.http
      .post<GrupoProducto>(
        `${this.baseUrl}${this.urlGrupoProducto}`,
        Observable,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  // Obtener Grupo Producto
  getGrupoProducto(): Observable<GrupoProducto> {
    return this.http
      .get<GrupoProducto>(`${this.baseUrl}${this.urlGrupoProducto}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar Grupo Producto
  updateGrupoProducto(
    id: number,
    GrupoProducto: any
  ): Observable<GrupoProducto> {
    return this.http
      .put<GrupoProducto>(
        `${this.baseUrl}${this.urlGrupoProducto}${id}/`,
        GrupoProducto,
        { headers: this.getHeaders() }
      )
      .pipe(catchError(this.handleError));
  }

  // Eliminar Grupo Producto
  deleteGrupoProducto(id: number): Observable<GrupoProducto> {
    return this.http
      .delete<GrupoProducto>(`${this.baseUrl}${this.urlGrupoProducto}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Crear Compra
  postCompra(): Observable<Compra> {
    return this.http
      .post<Compra>(`${this.baseUrl}${this.urlCompra}`, Observable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener Compra
  getCompra(): Observable<Compra> {
    return this.http
      .get<Compra>(`${this.baseUrl}${this.urlCompra}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar Compra
  updateCompra(id: number, Compra: any): Observable<Compra> {
    return this.http
      .put<Compra>(`${this.baseUrl}${this.urlCompra}${id}/`, Compra, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Eliminar Compra
  deleteCompra(id: number): Observable<Compra> {
    return this.http
      .delete<Compra>(`${this.baseUrl}${this.urlCompra}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Crear User
  postUser(): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}${this.urlUser}`, Observable, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Obtener User
  getUser(): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}${this.urlUser}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Actualizar User
  updateUser(id: number, User: any): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}${this.urlUser}${id}/`, User, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Eliminar User
  deleteUser(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.baseUrl}${this.urlUser}${id}/`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }
}
