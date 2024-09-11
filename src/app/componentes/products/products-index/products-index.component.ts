import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Products } from '../../../interfaces/products';
import { ProductsService } from '../products.service';
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
    CommonModule,
    HttpClientModule,
  ],
  providers: [ProductsService],
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
    'acciones',
  ];

  dataSource = new MatTableDataSource<Products>([]);
  constructor(private productsService: ProductsService) {} // Inyecta el servicio
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
  // Método para eliminar un cliente por su ID
  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (product) => product.id !== id
      );
      console.log('Producto con id ${id} eliminado');
    });
  }
}