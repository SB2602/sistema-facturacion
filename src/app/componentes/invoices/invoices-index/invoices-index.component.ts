import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  styleUrl: './invoices-index.component.css',
})
export class InvoicesIndexComponent {
  displayedColumns: string[] = [
    'id',
    'numero_factura',
    'fecha',
    'cliente',
    'total',
    'acciones'
  ];

  applyFilter(event: Event) {}
  // Método para eliminar un cliente por su ID
  deleteInvoice(id: number): void {}
}
