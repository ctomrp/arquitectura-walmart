import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service'; 


@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {
  constructor(
  private backendService: BackendService,
  private fb:FormBuilder,){}

  Sucursal: any|undefined;
  form = this.fb.group({
    nombre:["",[Validators.required]],
    ubicacion:["",[Validators.required]]
  });  

  getSucursal(){
    this.backendService.getSucursal().subscribe((data)=>{
      this.Sucursal = data
    })
  }

  submit():void{
    this.backendService.postSucursal(this.form.getRawValue()).subscribe(
      ()=>{
        this.getSucursal();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteSucursal(idSucursal:number){
    this.backendService.deleteSucursal(idSucursal).subscribe(()=>{
      this.getSucursal()
    })
  }

  updateSucursal(idSucursal:number){
    this.backendService.updateSucursal(idSucursal,this.form.getRawValue()).subscribe(()=>{
      this.getSucursal()
      this.form.reset()
    })
  }
}
