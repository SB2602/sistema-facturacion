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
import { Router } from '@angular/router';
import { ClientsService } from '../clients.service'; // Cambiado a ClientsService

@Component({
  selector: 'app-clients-add', // Cambiado a 'clients-add'
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
  templateUrl: './clients-add.component.html', // Cambiado a 'clients-add.component.html'
  styleUrl: './clients-add.component.css', // Cambiado a 'clients-add.component.css'
})
export class ClientsAddComponent {
  rucFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]{11}$'),
  ]);

  nombreFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);

  apellidoFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);

  correoFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);

  telefonoFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[0-9]{9}$'),
  ]);

  direccionFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9., ]+$'),
  ]);

  hide = signal(true);

  constructor(
    private clientsService: ClientsService, // Cambiado a ClientsService
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (
      this.rucFormControl.valid &&
      this.nombreFormControl.valid &&
      this.apellidoFormControl.valid &&
      this.correoFormControl.valid &&
      this.telefonoFormControl.valid &&
      this.direccionFormControl.valid
    ) {
      const clientData = {
        ruc: this.rucFormControl.value!,
        nombre: this.nombreFormControl.value!,
        apellido: this.apellidoFormControl.value!,
        correo: this.correoFormControl.value!,
        telefono: this.telefonoFormControl.value!,
        direccion: this.direccionFormControl.value!,
      };
      this.clientsService.addClient(clientData).subscribe({
        next: (response) => {
          console.log('Cliente agregado exitosamente', response);
          this.clientsService.refreshClients();
          this.router.navigate(['/clients/index']);
        },
        error: (error) => {
          console.error('Error al agregar cliente', error);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
