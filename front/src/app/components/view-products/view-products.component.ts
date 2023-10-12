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
  currentPage = 1;
  itemsPerPage = 40; 
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

async descargarPDF(): Promise<void> {
  try {
    const documento = new jsPDF('p', 'pt', 'a4');
    const opciones = {
      background: 'white',
      scale: 1
    };

    // Esperar un breve momento para asegurarse de que la tabla esté completamente renderizada
    await new Promise(resolve => setTimeout(resolve, 1000));

    const htmlData = document.getElementById('htmlData');

    // Verificar si se encontró un elemento con el ID especificado
    if (htmlData) {
      const pages = this.totalPages; // Usamos el total de páginas de la paginación

      for (let i = 0; i < pages; i++) {
        if (i > 0) {
          documento.addPage();
        }

        // Actualizamos la página de la paginación
        this.currentPage = this.currentPage+1;

        // Captura la parte visible de la página actual
        const canvas = await html2canvas(htmlData, {
          ...opciones
        });

        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (documento as any).getImageProperties(img);
        const pdfWidth = documento.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Agrega la imagen al PDF
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
      }

      // Guarda el PDF
      documento.save(`Reporte_Fecha(${new Date().toISOString()}).pdf`);
    } else {
      console.error('No se encontró el elemento con el ID "htmlData".');
    }
  } catch (error) {
    console.error('Error al descargar el PDF:', error);
  }
}

//funciones de paginacion para boostrap
get paginatedReporte() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.reporte.slice(startIndex, endIndex);
}

get totalPages(): number {
  return Math.ceil(this.reporte.length / this.itemsPerPage);
}


}
