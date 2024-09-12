import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
} from '@angular/core';
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
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

import { CategoriesService } from '../../categories/categories.service'; // Asegúrate de tener este servicio
import { Categories } from '../../../interfaces/categories';

import { Suppliers } from '../../../interfaces/suppliers';
import { SuppliersService } from '../../suppliers/suppliers.service';

@Component({
  selector: 'app-products-add', // Cambiado a 'products-add'
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './products-add.component.html', // Cambiado a 'products-add.component.html'
  styleUrl: './products-add.component.css', // Cambiado a 'products-add.component.css'
})
export class ProductsAddComponent implements OnInit {
  nombreProductoFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9 ]+$'),
  ]);

  descripcionFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9., ]+$'),
  ]);

  precioFormControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(0.01),
  ]);

  stockFormControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(0),
  ]);

  supplierFormControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  categoryFormControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);

  suppliers: Suppliers[] = [];
  categories: Categories[] = [];

  constructor(
    private productsService: ProductsService,
    private suppliersService:SuppliersService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe({
      next: (suppliers) => (this.suppliers = suppliers),
      error: (error) => console.error('Error al cargar proveedores', error),
    });

    this.categoriesService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => console.error('Error al cargar categorías', error),
    });
  }

  onSubmit() {
    if (
      this.nombreProductoFormControl.valid &&
      this.descripcionFormControl.valid &&
      this.precioFormControl.valid &&
      this.stockFormControl.valid &&
      this.supplierFormControl.valid &&
      this.categoryFormControl.valid
    ) {
      const productData = {
        nombre_producto: this.nombreProductoFormControl.value!,
        descripcion: this.descripcionFormControl.value!,
        precio: this.precioFormControl.value!,
        stock: this.stockFormControl.value!,
        supplier: {
          id: this.supplierFormControl.value!,
        },
        category: {
          id: this.categoryFormControl.value!,
        },
      };
      this.productsService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Producto agregado exitosamente', response);
          this.productsService.refreshProducts();
          this.router.navigate(['/products/index']);
        },
        error: (error) => {
          console.error('Error al agregar producto', error);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}