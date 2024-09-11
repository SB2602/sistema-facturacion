import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
//import { Role } from '../../../interfaces/role';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-add',
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
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.css',
})
export class ProductsAddComponent {
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

  estadoFormControl = new FormControl<boolean | null>(
    null,
    Validators.required
  );

  hide = signal(true);

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (
      this.nombreProductoFormControl.valid &&
      this.descripcionFormControl.valid &&
      this.precioFormControl.valid &&
      this.stockFormControl.valid
    ) {
      const productData = {
        nombre_producto: this.nombreProductoFormControl.value!,
        descripcion: this.descripcionFormControl.value!,
        precio: this.precioFormControl.value!,
        stock: this.stockFormControl.value!,
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