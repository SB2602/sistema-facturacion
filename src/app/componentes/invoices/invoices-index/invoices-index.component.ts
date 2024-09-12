import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoicesService } from '../invoices.service';
import { invoices } from '../../../interfaces/invoices';
import { InvoiceDetailsComponent } from '../../../invoice-details/invoice-details.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-invoices-index',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    RouterLink
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
    'acciones'
  ];

  dataSource: invoices[] = [];

  constructor(
    private invoicesService: InvoicesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.invoicesService.getInvoices().subscribe((invoices) => {
      this.dataSource = invoices;
      console.log('Invoices:', this.dataSource);  // Mensaje en consola para verificar datos
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implementar lógica de filtrado aquí
  }

  deleteInvoice(id: number): void {
    this.invoicesService.deleteInvoice(id).subscribe(() => {
      // Actualizar la tabla después de eliminar
      this.dataSource = this.dataSource.filter(invoice => invoice.id !== id);
    });
  }
  openDetails(invoiceId: number): void {
    const dialogRef = this.dialog.open(InvoiceDetailsComponent, {
      width: '600px',
      data: { invoiceId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
