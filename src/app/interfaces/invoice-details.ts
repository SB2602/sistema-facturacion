import { invoices } from "./invoices";
import { Products } from "./products";

export interface InvoiceDetail {
  id?: number;
  invoice: { id: number }; // Debe coincidir con la estructura esperada por el backend
  product: { id: number }; // Debe coincidir con la estructura esperada por el backend
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  }