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
import { CommonModule } from '@angular/common'; // Importa CommonModu
@Component({
  selector: 'app-clients-edit',
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
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css'],
})
export class ClientsEditComponent {
  rucFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'), // Puedes ajustar el patrón según las reglas específicas para RUC
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
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
