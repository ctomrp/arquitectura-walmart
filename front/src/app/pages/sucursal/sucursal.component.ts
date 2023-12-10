import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service'; 
import { Sucursal } from 'src/app/interfaces/Sucursal';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {
  constructor(private backendService: BackendService){}
  Sucursal: Sucursal|undefined;


  getSucursal(){
    this.backendService.getSucursal().subscribe((data)=>{
      this.Sucursal = data
    })
  }

}
