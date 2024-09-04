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
  styleUrl: './suppliers-add.component.css',
})
export class SuppliersAddComponent {
  rucFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{11}$') 
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9+ ]+$'),
  ]);
  addressFormControl = new FormControl('', [Validators.required]);
  statusFormControl = new FormControl<'activo' | 'inactivo' | null>(null, Validators.required);
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
}
