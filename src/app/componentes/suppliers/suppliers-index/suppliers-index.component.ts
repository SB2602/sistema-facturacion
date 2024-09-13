import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Suppliers } from '../../../interfaces/suppliers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { SuppliersService } from '../suppliers.service'; // Importa el servicio
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
  providers: [SuppliersService], // Añade aquí la configuración de HttpClient
  templateUrl: './suppliers-index.component.html',
  styleUrls: ['./suppliers-index.component.css'], // Corrige "styleUrl" a "styleUrls"
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

  dataSource = new MatTableDataSource<Suppliers>([]);

  constructor(private suppliersService: SuppliersService) {} // Inyecta el servicio

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar los proveedores', error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSupplier(id: number): void {
    this.suppliersService.deleteSupplier(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (supplier) => supplier.id !== id
      );
      console.log(`Proveedor con id ${id} eliminado`);
    });
  }
}
