import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Products } from '../../../interfaces/products';

const ELEMENT_DATA: Products[] = [
  {
    id: 1,
    nombre_producto: 'Laptop ASUS',
    descripcion:
      'Laptop ASUS de 15 pulgadas con procesador Intel i7 y 16GB de RAM.',
    precio: 1500.0,
    stock: 10,
    estado: true,
  },
  {
    id: 2,
    nombre_producto: 'Mouse Logitech',
    descripcion:
      'Mouse inalámbrico Logitech con batería recargable y sensor óptico.',
    precio: 50.0,
    stock: 50,
    estado: true,
  },
  {
    id: 3,
    nombre_producto: 'Monitor Samsung',
    descripcion: 'Monitor Samsung de 24 pulgadas con resolución Full HD.',
    precio: 200.0,
    stock: 5,
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
  templateUrl: './products-index.component.html',
  styleUrl: './products-index.component.css',
})
export class ProductsIndexComponent {
  displayedColumns: string[] = [
    'id',
    'nombre_producto',
    'descripcion',
    'precio',
    'stock',
    'estado',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}