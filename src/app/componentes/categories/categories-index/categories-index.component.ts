import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Categories } from '../../../interfaces/categories';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CategoriesService } from '../categories.service'; // Importa el servicio
import { HttpClientModule } from '@angular/common/http';

// Componente para listar las categorias
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
  providers: [CategoriesService],
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.css'],
})
export class CategoriesIndexComponent {
  displayedColumns: string[] = [
    'id',
    'nombre_categorias',
    'descripcion',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Categories>([]);

  constructor(private categoriesService: CategoriesService) {} // Inyecta el servicio
  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar las categorias', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para eliminar un cliente por su ID
  deleteCategory(id: number): void {
    this.categoriesService.deleteCategory(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (category) => category.id !== id
      );
      console.log(`Categoría con id ${id} eliminado`);
    });
  }
}
