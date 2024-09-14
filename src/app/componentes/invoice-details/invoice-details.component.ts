import { Component, Inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceDetailsService } from '../invoices/invoice-details.service';
import { ProductsService } from '../products/products.service'; // Importar el servicio de productos
import { InvoiceDetail } from '../../interfaces/invoice-details'; // Asegúrate de tener esta interfaz
import { Products } from '../../interfaces/products';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'cantidad',
    'precio_unitario',
    'subtotal',
  ];

  dataSource: InvoiceDetail[] = [];
  totalSubtotal: number = 0;
  totalTax: number = 0;

  constructor(
    private invoiceDetailsService: InvoiceDetailsService,
    private productsService: ProductsService, // Inyectar el servicio de productos
    @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number } // Recibir el ID de la factura
    
  ) {}

  ngOnInit(): void {
    console.log('Invoice ID received in dialog:', this.data.invoiceId);
    this.invoiceDetailsService
      .getInvoiceDetailsByInvoiceId(this.data.invoiceId).subscribe((details: InvoiceDetail[]) => {
        // Asegúrate de que 'details' es un array
        console.log('Details received from backend:', details);
        this.dataSource = details;
        this.loadProductNames();
      });
  }

  private loadProductNames() {
    // Crear un array para las solicitudes de productos
    const productRequests = this.dataSource.map((detail) =>
      this.productsService
        .getProductById(detail.product.id)
        .toPromise()
        .then((product: Products | undefined) => {
          if (product) {
            // Asignar el nombre del producto si el producto no es undefined
            (detail as any).productName = product.nombre_producto;
          } else {
            // Asignar un valor predeterminado o manejar el caso donde el producto no se encuentra
            (detail as any).productName = 'Nombre no disponible';
          }
        })
    );

    // Esperar a que todas las solicitudes se completen
    Promise.all(productRequests).then(() => {
      this.calculateTotals(); // Recalcular totales después de cargar nombres de productos
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource = this.dataSource.filter((detail) =>
      Object.values(detail).some((val) =>
        val?.toString().toLowerCase().includes(filterValue)
      )
    );
    this.calculateTotals(); // Recalcular totales después de aplicar el filtro
  }

  private calculateTotals() {
    this.totalSubtotal = this.dataSource.reduce(
      (sum, detail) => sum + (detail.subtotal || 0),
      0
    );
    this.totalTax = this.totalSubtotal * 0.18;
  }
}
