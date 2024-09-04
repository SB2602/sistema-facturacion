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
import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-products-add',
  standalone: true,
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.css',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsAddComponent {
  nombreProductoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9 ]+$'),
  ]);

  descripcionFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9., ]+$'),
  ]);

  precioFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0.01),
  ]);

  stockFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);

  estadoFormControl = new FormControl<boolean | null>(
    null,
    Validators.required
  );

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
