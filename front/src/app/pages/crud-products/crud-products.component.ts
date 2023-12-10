import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.css']
})
export class CrudProductsComponent {

  productos: any | undefined;
  form = this.fb.group({
    nombre: ["",[Validators.required]],
    precio: ["",[Validators.required]],
    descripcion: ["",[Validators.required]],
    grupo:["",[Validators.required]]
  });
  constructor(private backendService: BackendService, private fb: FormBuilder){}

  traerProductos(){
    this.backendService.getProducto().subscribe((data)=>{
      this.productos = data
      console.log(data)
    })
  }

  eliminarProducto(idProducto: number){
      console.log(`Eliminar compra con ID: ${idProducto}`);
      this.backendService.deleteProducto(idProducto).subscribe(() => {
        // Puedes recargar las compras después de eliminar si es necesario
        this.traerProductos();
      });
  }

  crearProducto(): void{
    this.backendService.postProducto(this.form.getRawValue()).subscribe(
      () =>{
      this.traerProductos();
      this.form.reset();
    },
    (error) => 
      console.log(error)
    )
  }

  editarProducto(idProducto: number){
    this.backendService.updateProducto(idProducto, this.form.getRawValue()).subscribe(
      (productoActualizado) => {
        // Manejar la lógica después de una actualización exitosa, si es necesario
        console.log('Producto actualizado:', productoActualizado);
        this.traerProductos();
        this.form.reset();
      },
      (error) => {
        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error('Error al actualizar el producto:', error);
        this.form.reset();
      }
    );
  }

  
}
