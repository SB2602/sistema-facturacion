import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Products } from '../../../interfaces/products';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatTableModule } from '@angular/material/table';
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
  providers: [ProductsService],
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.css'],
})
export class ProductsIndexComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre_producto',
    'descripcion',
    'precio',
    'stock',
    'supplierRuc',
    'supplierNombre',
    'supplierApellido',
    'categoryNombre',
    'categoryDescripcion',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Products>([]);

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (product) => product.id !== id
      );
      console.log(`Producto con id ${id} eliminado`);
    });
  }
}