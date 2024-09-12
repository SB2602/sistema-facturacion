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
    private dialog: MatDialog
    
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
  
}
