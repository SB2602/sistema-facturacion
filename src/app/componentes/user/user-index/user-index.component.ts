import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

const ELEMENT_DATA: User[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan.perez@ejemplo.com',
    contraseña: '123456',
    rol: 'admin',
    fecha_creacion: new Date('2022-01-01'),
    estado: true,
},
{
    id: 2,
    nombre: 'María',
    apellido: 'Gómez',
    correo: 'maria.gomez@ejemplo.com',
    contraseña: 'abcdef',
    rol: 'vendedor',
    fecha_creacion: new Date('2022-02-01'),
    estado: true,
},
{
    id: 3,
    nombre: 'Pedro',
    apellido: 'Rodríguez',
    correo: 'pedro.rodriguez@ejemplo.com',
    contraseña: '987654',
    rol: 'admin',
    fecha_creacion: new Date('2022-03-01'),
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
  ],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css',
})
export class UserIndexComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'correo',
    'contraseña',
    'rol',
    'fecha_creacion',
    'estado',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}