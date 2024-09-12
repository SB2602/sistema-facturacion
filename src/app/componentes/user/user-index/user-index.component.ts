import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service'; // Importa tu servicio de usuarios
import { User } from '../../../interfaces/user';

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
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
})
export class UserIndexComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'correo',
    'rol', 
    'contrasena', // Aquí mostramos la descripción del rol
    'estado', // Aquí mostramos "Activo" o "Inactivo"
    'acciones',
  ];

  dataSource = new MatTableDataSource<User>([]); // Inicialmente vacío

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Carga los usuarios cuando se inicializa el componente
  }

  // Método para cargar los usuarios desde el servicio
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        // No transformes el valor de 'estado' a cadena en TypeScript
        const transformedUsers = users.map(user => ({
          ...user,
          rol: user.role.name, // Solo transforma el rol
          contrasena: user.contraseña
        }));
        this.dataSource.data = transformedUsers;
        console.log('Datos cargados:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }
  // Método para filtrar los datos en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para eliminar un usuario
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (user) => user.id !== id
      );
      console.log(`Usuario con id ${id} eliminado`);
    });
  }
}