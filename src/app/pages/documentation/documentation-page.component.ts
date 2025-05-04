import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PdfThumbnailService } from './pdf_thumbnail.service';

interface Document {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  pdfUrl: string;
  docxUrl?: string;
  category: string;
}

@Component({
  selector: 'documentation-page',
  templateUrl: './documentation-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationPageComponent implements OnInit {
  documents: Document[] = [
    {
      id: 'formato1',
      title: 'FORMATO PRESENTACIÓN FAMILIARES ASOCIACIÓN',
      description: 'Formato para presentación de familiares en la asociación',
      previewImage: '',
      pdfUrl: 'public/assets/docs/documents/FORMATO_PRESENTACION_FAMILIARES_ASOCIACION.pdf',
      category: 'Administrativos',
    },
    {
      id: 'formato2',
      title: 'FORMATO SOLICITUD DE CRÉDITO',
      description: 'Formato para solicitud de créditos',
      previewImage: '',
      pdfUrl: '/public/assets/docs/documents/Formato_SOLICITUD_DE_CREDITO.pdf',
      category: 'Créditos',
    },
    {
      id: 'formato3',
      title: 'SE SERVICIOS',
      description: 'Formato para servicios especiales',
      previewImage: '',
      pdfUrl: '/public/assets/docs/documents/SE_SERVICIOS.pdf',
      category: 'Servicios',
    },
    {
      id: 'formato4',
      title: 'SED APORTES',
      description: 'Formato para registro de aportes',
      previewImage: '',
      pdfUrl: '/public/assets/docs/documents/SED_APORTES.pdf',
      category: 'Aportes',
    },
  ];

  filteredDocuments: Document[] = [];

  // Inyectando el servicio de forma más directa con "inject"
  private pdfThumbnailService = inject(PdfThumbnailService);

  async ngOnInit() {
    const docsWithThumbnails = await Promise.all(
      this.documents.map(async (doc) => ({
        ...doc,
        previewImage: await this.pdfThumbnailService.generateThumbnail(doc.pdfUrl),
      }))
    );

    this.filteredDocuments = docsWithThumbnails;
  }

  getUniqueCategories(): string[] {
    const categories = this.documents.map((doc) => doc.category);
    return [...new Set(categories)];
  }

  filterByCategory(category: string): void {
    this.filteredDocuments = this.documents.filter((doc) => doc.category === category);
  }

  clearFilters(): void {
    this.filteredDocuments = this.documents;
  }

  openDocument(documentId: string): void {
    const doc = this.documents.find((d) => d.id === documentId);
    if (doc) {
      window.open(doc.pdfUrl, '_blank');
    }
  }

  downloadDocument(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || url.split('/').pop() || 'documento.pdf';
    link.click();
  }
}
