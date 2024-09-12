export interface Products {
  id?: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  stock: number;
  supplierId?: number; // Suponiendo que solo tienes el ID del cliente
  categoryId?: number;
}
