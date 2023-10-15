import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  reporte: any | undefined;
  constructor(private backendService:BackendService) {}

  async postReport(){
    try {
      await this.backendService.postReport().subscribe(data=>{
        this.reporte = data
        Swal.fire(
          'Reporte Procesado!',
          'El reporte ha sido guardado en la base de datos',
          'success'
        )
      })
    } catch (error) {
      console.log(error)
    }
  } 
}