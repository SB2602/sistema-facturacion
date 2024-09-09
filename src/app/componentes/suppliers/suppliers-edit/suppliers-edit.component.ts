import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.css'],
})
export class SuppliersEditComponent implements OnInit {
  supplierForm: FormGroup;
  supplierId!: number;

  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.supplierForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Supplier ID:', this.supplierId); // Mensaje en consola para verificar el ID
    if (this.supplierId) {
      this.suppliersService.getSupplierById(this.supplierId).subscribe(
        (supplier) => {
          console.log('Fetched supplier:', supplier); // Verifica que los datos se reciban correctamente
          this.supplierForm.patchValue(supplier);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching supplier:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      this.suppliersService
        .updateSupplier(this.supplierId, this.supplierForm.value)
        .subscribe(
          () => {
            this.router.navigate(['/suppliers/index']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating supplier:', error);
          }
        );
    }
  }
}
