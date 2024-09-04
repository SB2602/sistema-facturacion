import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Suppliers } from '../../../interfaces/suppliers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

const ELEMENT_DATA: Suppliers[] = [
  {
    id: 1,
    ruc:'123456',
    nombre: 'Ana',
    apellido: 'Martínez',
    correo: 'ana.martinez@ejemplo.com',
    telefono: '123-456-7890',
    direccion: 'Calle 123, Ciudad A',
   
  },
  {
    id: 2,
    ruc:'123456',
    nombre: 'Luis',
    apellido: 'Hernández',
    correo: 'luis.hernandez@ejemplo.com',
    telefono: '098-765-4321',
    direccion: 'Avenida 456, Ciudad B',
  
  },
  {
    id: 3,
    ruc:'123456',
    nombre: 'Carla',
    apellido: 'Ríos',
    correo: 'carla.rios@ejemplo.com',
    telefono: '555-678-1234',
    direccion: 'Plaza 789, Ciudad C',

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
  templateUrl: './suppliers-index.component.html',
  styleUrl: './suppliers-index.component.css',
})
export class SuppliersIndexComponent {
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

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSupplier(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(
      (supplier) => supplier.id !== id
    );
    console.log(`Proveedor con id ${id} eliminado`);
  }
}
