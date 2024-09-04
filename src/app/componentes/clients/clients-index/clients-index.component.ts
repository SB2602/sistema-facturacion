import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Clients } from '../../../interfaces/clients';
import { CommonModule } from '@angular/common';  // Importa CommonModule

const ELEMENT_DATA: Clients[] = [
  {
    id: 1,
    ruc:'12345678',
    nombre: 'Ana',
    apellido: 'Martínez',
    correo: 'ana.martinez@ejemplo.com',
    telefono: '123-456-7890',
    direccion: 'Calle 123, Ciudad A',
    fecha_creacion: new Date('2023-04-15'),
    estado: true,
},
{
    id: 2,
    ruc:'12345678',
    nombre: 'Luis',
    apellido: 'Hernández',
    correo: 'luis.hernandez@ejemplo.com',
    telefono: '098-765-4321',
    direccion: 'Avenida 456, Ciudad B',
    fecha_creacion: new Date('2023-05-20'),
    estado: true,
},
{
    id: 3,
    ruc:'12345678',
    nombre: 'Carla',
    apellido: 'Ríos',
    correo: 'carla.rios@ejemplo.com',
    telefono: '555-678-1234',
    direccion: 'Plaza 789, Ciudad C',
    fecha_creacion: new Date('2023-06-10'),
    estado: false,
},


];
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
  ],
  templateUrl: './clients-index.component.html',
  styleUrl: './clients-index.component.css',
})
export class ClientsIndexComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'ruc',
    'apellido',
    'correo',
    'telefono',
    'direccion',
    'acciones'
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Método para eliminar un cliente por su ID
  deleteClient(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(client => client.id !== id);
    console.log(`Cliente con id ${id} eliminado`);
  }
}
