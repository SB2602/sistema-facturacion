import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

const ELEMENT_DATA: User[] = [
 
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
    'acciones',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteUser(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(
      (user) => user.id !== id
    );
    console.log(`Usuario con id ${id} eliminado`);
  }
}
