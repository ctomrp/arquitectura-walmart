import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {
  reporte: any | undefined
  constructor(private backendService:BackendService ){
    
  }

  getReporteApi(){
    this.backendService.getReporte().subscribe(data=>{
      this.reporte = data
    })
  }

  postReport(){
    this.backendService.postReport().subscribe(data=>{
      this.reporte = data
    })
  }

  descargarPDF(): void{
    const documento = new jsPDF('p', 'pt', 'a4');
    const informacion: any  = document.getElementById('htmlData');
    const opciones = {
      background: 'white',
      scale: 3
    }

    html2canvas(informacion, opciones).then((canvas) =>{
      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (documento as any).getImageProperties(img)
      const pdfWidth = documento.internal.pageSize.getWidth() - 2 *bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      documento.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      return documento;
    })
      .then((docResult) => {
        docResult.save(`Reporte_Fecha(${new Date().toISOString()}).pdf`);
      })
  }
}
