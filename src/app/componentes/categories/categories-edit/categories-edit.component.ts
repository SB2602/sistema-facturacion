import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
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
  selector: 'app-categories-edit',
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
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css'],
})
export class CategoriesEditComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      nombre_categorias: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Category ID:', this.categoryId); // Mensaje en consola para verificar el ID
    if (this.categoryId) {
      this.categoriesService.getCategoryById(this.categoryId).subscribe(
        (category) => {
          console.log('Fetched category:', category); // Verifica que los datos se reciban correctamente
          this.categoryForm.patchValue(category);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching category:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoriesService
        .updateCategory(this.categoryId, this.categoryForm.value)
        .subscribe(
          () => {
            this.router.navigate(['/categories/index']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating category:', error);
          }
        );
    }
  }
}
