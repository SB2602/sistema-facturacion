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
import { CategoriesService } from '../categories.service';
@Component({
  selector: 'app-categories-add',
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
  templateUrl: './categories-add.component.html',
  styleUrl: './categories-add.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush, // Ver si esta línea se elimina
})
export class CategoriesAddComponent {
  nombreCategoriasFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);

  descripcionFormControl = new FormControl('', [Validators.required]);

  estadoFormControl = new FormControl<string | null>(null, Validators.required);

  hide = signal(true);

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (
      this.nombreCategoriasFormControl.valid &&
      this.descripcionFormControl.valid
    ) {
      const categoryData = {
        nombre_categorias: this.nombreCategoriasFormControl.value!,
        descripcion: this.descripcionFormControl.value!,
      };
      this.categoriesService.addCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Categoría agregada exitosamente', response);
          this.categoriesService.refreshCategories(); // Actualiza la lista en el servicio
          this.router.navigate(['/categories/index']); // Redirige al listado de categorías
        },
        error: (error) => {
          console.error('Error al agregar categoría', error);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}