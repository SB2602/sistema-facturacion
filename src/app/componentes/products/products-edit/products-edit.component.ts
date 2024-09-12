import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../clients/clients.service';
import { CategoriesService } from '../../categories/categories.service';
import { Clients } from '../../../interfaces/clients';
import { Categories } from '../../../interfaces/categories';
import { Products } from '../../../interfaces/products';
import { MatSelectModule } from '@angular/material/select';
import { Suppliers } from '../../../interfaces/suppliers';
import { SuppliersService } from '../../suppliers/suppliers.service';

@Component({
  selector: 'app-products-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  suppliers: Suppliers[] = [];
  categories: Categories[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private suppliersService: SuppliersService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre_producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        ],
      ],
      stock: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      supplier: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL

    if (this.productId) {
      this.productsService.getProductById(this.productId).subscribe(
        (product: Products) => {
          console.log('Fetched product:', product); // Verifica los datos del producto
          this.productForm.patchValue({
            nombre_producto: product.nombre_producto,
            descripcion: product.descripcion,
            precio: product.precio,
            stock: product.stock,
            supplier: product.supplierId, // Usa clientId en lugar de client
            category: product.categoryId, // Usa categoryId en lugar de category
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching product:', error);
        }
      );
    }

    // Obtener clientes
    this.suppliersService.getSuppliers().subscribe({
      next: (suppliers) => (this.suppliers =suppliers),
      error: (error) => console.error('Error loading suppliers', error),
    });

    // Obtener categorías
    this.categoriesService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => console.error('Error loading categories', error),
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.productForm.value,
        supplier: { id: this.productForm.value.supplier }, // Usar clientId
        category: { id: this.productForm.value.category }, // Usar categoryId
      };

      this.productsService
        .updateProduct(this.productId, updatedProduct)
        .subscribe(
          () => {
            this.router.navigate(['/products/index']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating product:', error);
          }
        );
    }
  }
}