import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-rd-sales',
  templateUrl: './rd-sales.component.html',
  styleUrls: ['./rd-sales.component.css']
})
export class RdSalesComponent {

  compras: any | undefined;

  constructor(private backendService: BackendService){}

  traerCompras(){
    this.backendService.getCompra().subscribe((data)=>{
      this.compras = data
      console.log(data)
    })
  }

  eliminarCompra(idCompra: number){
    console.log(`Eliminar compra con ID: ${idCompra}`);
    this.backendService.deleteCompra(idCompra).subscribe(() => {
      // Puedes recargar las compras después de eliminar si es necesario
      this.traerCompras();
    });
  }
}
