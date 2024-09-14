import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { invoices } from '../../interfaces/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private apiUrl = 'http://localhost:8080/api/v1/invoices';
  private invoicesSubject = new BehaviorSubject<invoices[]>([]);
  invoices$ = this.invoicesSubject.asObservable();
  constructor(private http: HttpClient) {}

  // Obtener todas las facturas
  getInvoices(): Observable<invoices[]> {
    return this.http.get<invoices[]>(this.apiUrl);
  }

  // Obtener una factura por su ID
  getInvoiceById(id: number): Observable<invoices> {
    return this.http.get<invoices>(`${this.apiUrl}/${id}`);
  }

  addInvoice(invoice: invoices): Observable<invoices> {
    return this.http.post<invoices>(`${this.apiUrl}`, invoice);
  }

  // Actualizar una factura existente
  updateInvoice(id: number, invoice: invoices): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, invoice);
  }

  // Eliminar una factura
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshInvoice() {
    this.getInvoices().subscribe((invoices) => this.invoicesSubject.next(invoices));
  }
}
