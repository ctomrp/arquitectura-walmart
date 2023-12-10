import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service'; 

@Component({
  selector: 'app-grupo-producto',
  templateUrl: './grupo-producto.component.html',
  styleUrls: ['./grupo-producto.component.css']
})
export class GrupoProductoComponent {

  constructor(
    private backendService: BackendService,
    private fb:FormBuilder,){}

    grupoProducto: any| undefined;
    form = this.fb.group({
      nombre:["",[Validators.required]]
    }); 

    submit():void{
      this.backendService.postGrupoProducto(this.form.getRawValue()).subscribe(
        ()=>{
          this.getGrupoProducto();
        },
        (error)=>{
          console.log(error);
        }
      )
     }
      getGrupoProducto(){
        this.backendService.getGrupoProducto().subscribe((data)=>{
          this.grupoProducto = data
        })
      }
    
      updateGrupoProducto(idgProducto:number){
        this.backendService.updateGrupoProducto(idgProducto,this.form.getRawValue()).subscribe(()=>{
          this.getGrupoProducto()
          this.form.reset()
        })
      }

      deleteGrupoProducto(idgProducto: number){
        this.backendService.deleteGrupoProducto(idgProducto).subscribe(()=>{
          this.getGrupoProducto()
        })
      }
}
