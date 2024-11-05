import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; // Importamos MatTableModule
import { Clients } from '../../../interfaces/clients';
import { ClientsService } from '../../clients/clients.service';
import { ProductsService } from '../../products/products.service';
import { Products } from '../../../interfaces/products';
import { AddProductDialogComponent } from '../../../add-product-dialog/add-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoicesService } from '../invoices.service';
import { invoices } from '../../../interfaces/invoices';
import { Router } from '@angular/router';
import { InvoiceDetailsService } from '../invoice-details.service';
import { InvoiceDetail } from '../../../interfaces/invoice-details';
@Component({
  selector: 'app-invoices-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule 
  ],
  templateUrl: './invoices-add.component.html',
  styleUrls: ['./invoices-add.component.css'],
})
export class InvoicesAddComponent {
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9 ]+$'),
  ]);
  numberFormControl = new FormControl('', { nonNullable: true });
  dateFormControl = new FormControl('', { nonNullable: true });
  clients: Clients[] = [];
  selectedClientId: number | null = null;

  // Productos seleccionados para la tabla
  selectedProducts: {
    productId: number;
    nombre_producto: string;
    quantity: number;
    price: number;
    total: number;
  }[] = [];

  // Definimos la propiedad invoiceDetails que será usada como dataSource en la tabla
  invoiceDetails = this.selectedProducts;

  constructor(
    private clientsService: ClientsService,
    private productsService: ProductsService,
    private dialog: MatDialog,
    private invoicesService: InvoicesService,
    private router: Router,
    private invoiceDetailsService: InvoiceDetailsService
  ) {}

  ngOnInit() {
    // Cargamos los clientes desde el servicio
    this.clientsService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  // Función para abrir el modal y agregar un producto
  openAddProductDialog() {
    this.productsService.getProducts().subscribe((products) => {
      const dialogRef = this.dialog.open(AddProductDialogComponent, {
        width: '400px',
    
        data: { products },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const selectedProduct = products.find(
            (p) => p.id === result.productId
          );
          if (selectedProduct) {
            const productData = {
              productId: selectedProduct.id!,
              nombre_producto: selectedProduct.nombre_producto,
              quantity: result.quantity,
              price: selectedProduct.precio,
              total: result.quantity * selectedProduct.precio,
            };
            this.selectedProducts.push(productData);
            // Actualizamos invoiceDetails con los productos seleccionados
            this.invoiceDetails = [...this.selectedProducts];
          }
        }
      });
    });
  }

  // Función para eliminar un producto de la tabla
  removeProduct(product: { productId: number }) {
    this.selectedProducts = this.selectedProducts.filter(
      (p) => p.productId !== product.productId
    );
    this.invoiceDetails = [...this.selectedProducts];
  }
  getSubtotal(): number {
    return this.selectedProducts.reduce(
      (subtotal, product) => subtotal + (product.price * product.quantity),
      0
    );
  }

  getTax(): number {
    return this.getSubtotal() * 0.18;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
  registerInvoice() {
    if (this.nameFormControl.invalid || this.dateFormControl.invalid || this.selectedClientId === null) {
      return; // Validaciones simples
    }
  
    const numeroFactura = this.nameFormControl.value ?? '';
    const fecha = new Date(this.dateFormControl.value);
  
    if (isNaN(fecha.getTime())) {
      console.error('Fecha inválida');
      return;
    }
  
    const invoice: invoices = {
      numero_factura: numeroFactura,
      fecha: fecha,
      cliente: { id: this.selectedClientId } as Clients,
      total: this.getTotal()
    };
  
    console.log('Enviando al backend:', invoice);
  
    this.invoicesService.addInvoice(invoice).subscribe(
      (response: invoices) => { // La respuesta debería ser de tipo `invoices`
        console.log('Factura registrada con éxito', response);
  
        // Verificar si la respuesta contiene un ID
        const invoiceId = response?.id;
        if (invoiceId) {
          this.saveInvoiceDetails(invoiceId);
        } else {
          console.error('ID de factura no encontrado en la respuesta');
        }
      },
      (error) => {
        console.error('Error al registrar la factura', error);
      }
    );
  }
  
  saveInvoiceDetails(invoiceId: number) {
    this.invoiceDetails.forEach(detail => {
      const invoiceDetail = {
        invoice: { id: invoiceId } as any, // Enviar solo el ID para la relación con la factura
        product: { id: detail.productId } as any, // Enviar solo el ID para la relación con el producto
        cantidad: detail.quantity,
        precio_unitario: detail.price,
        subtotal: detail.total
      };
  
      this.invoiceDetailsService.saveInvoiceDetails(invoiceDetail).subscribe(
        () => {
          console.log('Detalle de factura guardado con éxito');
          this.invoicesService.refreshInvoice();
          this.router.navigate(['/invoices/index']);
        },
        (error) => {
          console.error('Error al guardar el detalle de la factura', error);
        }
      );
    });
  }
  
  
}
