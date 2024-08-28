import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Categories } from '../../../interfaces/categories';

const ELEMENT_DATA: Categories[] = [
  {
    id: 1,
    nombre_categorias: 'Electrónica',
    descripcion:
      'Dispositivos electrónicos como computadoras, smartphones, y accesorios.',
    estado: true,
  },
  {
    id: 2,
    nombre_categorias: 'Muebles',
    descripcion: 'Mobiliario para el hogar y la oficina.',
    estado: true,
  },
  {
    id: 3,
    nombre_categorias: 'Ropa',
    descripcion: 'Prendas de vestir para todas las edades.',
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
  templateUrl: './categories-index.component.html',
  styleUrl: './categories-index.component.css',
})
export class CategoriesIndexComponent {
  displayedColumns: string[] = [
    'id',
    'nombre_categorias',
    'descripcion',
    'estado',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
