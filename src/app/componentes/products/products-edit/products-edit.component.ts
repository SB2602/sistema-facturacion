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
  ],
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css',
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre_producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    console.log('Product ID:', this.productId); // Mensaje en consola para verificar el ID
    if (this.productId) {
      this.productsService.getProductById(this.productId).subscribe(
        // Llama al servicio para obtener los datos del producto
        (product) => {
          console.log('Fetched product:', product); // Verifica que los datos se reciban correctamente
          this.productForm.patchValue(product);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productsService
        .updateProduct(this.productId, this.productForm.value) // Llama al servicio para actualizar los datos del producto
        .subscribe(
          () => {
            this.router.navigate(['/products/index']); // Redirige a la lista de productos
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating product:', error);
          }
        );
    }
  }
}
