import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { invoices } from '../../interfaces/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private apiUrl = 'http://localhost:8080/api/v1/invoices';

  constructor(private http: HttpClient) {}

  // Obtener todas las facturas
  getInvoices(): Observable<invoices[]> {
    return this.http.get<invoices[]>(this.apiUrl);
  }

  // Obtener una factura por su ID
  getInvoiceById(id: number): Observable<invoices> {
    return this.http.get<invoices>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva factura
  addInvoice(invoice: invoices): Observable<void> {
    return this.http.post<void>(this.apiUrl, invoice);
  }

  // Actualizar una factura existente
  updateInvoice(id: number, invoice: invoices): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, invoice);
  }

  // Eliminar una factura
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}