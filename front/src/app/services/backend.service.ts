import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Reporte } from '../interfaces/Reporte';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = "http://localhost:8000/Reporte/"
  constructor(private http:HttpClient) { }

  //getReporte
getReporte(): Observable<Reporte[]>{
  return this.http.get<Reporte[]>(this.url)
}


}
