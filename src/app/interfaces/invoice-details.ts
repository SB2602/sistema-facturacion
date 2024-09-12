export interface InvoiceDetail {
    id?: number;
    invoice?: {
      id: number;
    };
    product: {
      id: number;
    };
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
  }