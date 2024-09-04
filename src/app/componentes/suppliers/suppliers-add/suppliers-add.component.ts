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
import { CommonModule } from '@angular/common';
import { SuppliersService } from '../suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-add',
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
  templateUrl: './suppliers-add.component.html',
  styleUrls: ['./suppliers-add.component.css'],
})
export class SuppliersAddComponent {
  rucFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]{11}$'),
  ]);
  nameFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  surnameFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  emailFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9+ ]+$'),
  ]);
  addressFormControl = new FormControl<string | null>(null, [
    Validators.required,
  ]);
  statusFormControl = new FormControl<'activo' | 'inactivo' | null>(
    null,
    Validators.required
  );

  hide = signal(true);

  constructor(
    private suppliersService: SuppliersService,
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (
      this.rucFormControl.valid &&
      this.nameFormControl.valid &&
      this.surnameFormControl.valid &&
      this.emailFormControl.valid &&
      this.phoneFormControl.valid &&
      this.addressFormControl.valid
    ) {
      const supplierData = {
        ruc: this.rucFormControl.value!,
        nombre: this.nameFormControl.value!,
        apellido: this.surnameFormControl.value!,
        correo: this.emailFormControl.value!,
        telefono: this.phoneFormControl.value!,
        direccion: this.addressFormControl.value!,
      };
  
      this.suppliersService.addSupplier(supplierData).subscribe({
        next: (response) => {
          console.log('Proveedor agregado exitosamente', response);
          this.suppliersService.refreshSuppliers(); // Actualiza la lista en el servicio
          this.router.navigate(['/suppliers/index']); // Redirige al listado de proveedores
        },
        error: (error) => {
          console.error('Error al agregar proveedor', error);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  
}
