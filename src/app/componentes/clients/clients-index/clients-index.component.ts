import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Clients } from '../../../interfaces/clients'; // Cambia la interfaz a "clients"
import { ClientsService } from '../clients.service'; // Cambia el servicio a "clients"
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    RouterLink,
    CommonModule,
    HttpClientModule,
  ],
  providers: [ClientsService], // Cambia el proveedor a "ClientsService"
  templateUrl: './clients-index.component.html', // Cambia el template a "clients"
  styleUrl: './clients-index.component.css', // Cambia el archivo de estilos a "clients"
})
export class ClientsIndexComponent {
  displayedColumns: string[] = [
    'id',
    'ruc',
    'nombre',
    'apellido',
    'correo',
    'telefono',
    'direccion',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Clients>([]); // Cambia a la interfaz "Clients"

  constructor(private clientsService: ClientsService) {} // Cambia el servicio inyectado

  ngOnInit() {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para eliminar un cliente por su ID
  deleteClient(id: number): void {
    this.clientsService.deleteClient(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (client) => client.id !== id
      );
      console.log(`Cliente con id ${id} eliminado`);
    });
  }
}