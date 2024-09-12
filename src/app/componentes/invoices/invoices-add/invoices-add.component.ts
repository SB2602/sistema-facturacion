import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Clients } from '../../../interfaces/clients';
import { ClientsService } from '../../clients/clients.service';
@Component({
  selector: 'app-invoices-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './invoices-add.component.html',
  styleUrl: './invoices-add.component.css',
})
export class InvoicesAddComponent {
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]+$'),
  ]);
  numberFormControl = new FormControl('', { nonNullable: true });
  dateFormControl = new FormControl('', { nonNullable: true });
  clients: Clients[] = [];
  selectedClientId: number | null = null;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe(data => {
      this.clients = data;
    });
  }
  
}
