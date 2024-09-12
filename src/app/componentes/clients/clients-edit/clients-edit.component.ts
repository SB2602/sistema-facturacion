import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service'; // Cambié el servicio a ClientsService
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
  selector: 'app-clients-edit', // Cambié a 'clients'
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
  templateUrl: './clients-edit.component.html', // Cambié el archivo HTML a 'clients-edit'
  styleUrl: './clients-edit.component.css', // Cambié el archivo CSS a 'clients-edit'
})
export class ClientsEditComponent implements OnInit {
  clientForm: FormGroup;
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService, // Cambié a ClientsService
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Validación para RUC (11 dígitos)
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]], // Validación para correo electrónico
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Validación para teléfono (9 dígitos)
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID del cliente desde la URL
    console.log('Client ID:', this.clientId); // Mensaje en consola para verificar el ID
    if (this.clientId) {
      this.clientsService.getClientById(this.clientId).subscribe(
        // Llama al servicio para obtener los datos del cliente
        (client) => {
          console.log('Fetched client:', client); // Verifica que los datos se reciban correctamente
          this.clientForm.patchValue(client);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching client:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientsService
        .updateClient(this.clientId, this.clientForm.value) // Llama al servicio para actualizar los datos del cliente
        .subscribe(
          () => {
            this.router.navigate(['/clients/index']); // Redirige a la lista de clientes
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating client:', error);
          }
        );
    }
  }
}