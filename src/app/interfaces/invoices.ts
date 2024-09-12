import { Clients } from "./clients";

export interface invoices{
    id?:number;
    numero_factura:string;
    fecha:Date;
    cliente:Clients;
    total:number;
}