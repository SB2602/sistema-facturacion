import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetail } from '../interfaces/invoice-details';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';  // Importar para el botón
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-invoice-details',
  standalone: true, // Corregido a booleano
  imports: [CommonModule, MatTableModule, MatButtonModule,MatIcon], // Importar CommonModule y MatButtonModule
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent  {
  displayedColumns: string[] = [
    'id_producto',
    'nombre_producto',
    'cantidad', 
    'precio_unitario',
    'subtotal',
  ];
  invoiceDetails: InvoiceDetail[] = []; // Renombrado para coincidir con el HTML

  constructor(
    public dialogRef: MatDialogRef<InvoiceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number },
    private invoiceDetailsService: InvoiceDetailsService
  ) {}

}
