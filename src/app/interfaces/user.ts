export interface User {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  rol: string;
  fecha_creacion: Date;
  estado: boolean;
}
