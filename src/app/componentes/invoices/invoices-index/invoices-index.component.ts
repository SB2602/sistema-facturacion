import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoicesService } from '../invoices.service';
import { invoices } from '../../../interfaces/invoices';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDetailsComponent } from '../../invoice-details/invoice-details.component';
@Component({
  selector: 'app-invoices-index',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './invoices-index.component.html',
  styleUrls: ['./invoices-index.component.css'],
})
export class InvoicesIndexComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'numero_factura',
    'fecha',
    'cliente',
    'total',
    'acciones',
  ];

  dataSource: invoices[] = [];

  constructor(
    private invoicesService: InvoicesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.invoicesService.getInvoices().subscribe((invoices) => {
      this.dataSource = invoices;
      console.log('Invoices:', this.dataSource); // Mensaje en consola para verificar datos
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implementar lógica de filtrado aquí
  }

  deleteInvoice(id: number): void {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      // Actualizar la tabla después de eliminar
      this.dataSource = this.dataSource.filter((invoice) => invoice.id !== id);
    });
  }
  openInvoiceDetails(invoiceId: number) {
    // Abrir el modal con los detalles de la factura
    this.dialog.open(InvoiceDetailsComponent, {
      data: { invoiceId: invoiceId }, // Pasar el ID de la factura al modal
      width: '40vw',  // Ajusta el ancho del modal
    height: '50vh', // Ajusta la altura del modal
    maxWidth: '90vw', // Establece un ancho máximo para el modal
    maxHeight: '90vh', // Establece una altura máxima para el modal
    });
  }
}
