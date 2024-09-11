import { Role } from "./role";

export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  role: Role;
  fecha_creacion?: Date;
  estado: boolean;
}
