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
    MatDialogModule // Aseguramos que MatTableModule esté importado
  ],
  templateUrl: './invoices-add.component.html',
  styleUrls: ['./invoices-add.component.css'],
})
export class InvoicesAddComponent {
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
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
      return; // Validaciones simples, puedes mejorar esto con mensajes de error
    }
  
    // Asegúrate de que el valor no sea null y conviértelo a string
    const numeroFactura = this.nameFormControl.value ?? ''; // Si es null, usa una cadena vacía
  
    // Convierte el valor de fecha a Date
    const fecha = new Date(this.dateFormControl.value);
  
    // Asegúrate de que la conversión sea válida
    if (isNaN(fecha.getTime())) {
      console.error('Fecha inválida');
      return;
    }
  
    const invoice: invoices = {
      numero_factura: numeroFactura,
      fecha: fecha, // Asigna la fecha convertida
      cliente: { id: this.selectedClientId } as Clients, // Solo enviamos el id del cliente
      total: this.getTotal()
    };
  
    // Imprime el objeto invoice en la consola para verificar
    console.log('Enviando al backend:', invoice);
  
    this.invoicesService.addInvoice(invoice).subscribe(
      () => {
        console.log('Factura registrada con éxito');
      },
      (error) => {
        console.error('Error al registrar la factura', error);
      }
    );
  }
}
