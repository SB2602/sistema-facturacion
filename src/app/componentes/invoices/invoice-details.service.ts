// invoice-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDetail } from '../../interfaces/invoice-details'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {
  private apiUrl = 'http://localhost:8080/api/v1/invoice-details'; // Ajusta la URL según sea necesario

  constructor(private http: HttpClient) {}

  saveInvoiceDetails(invoiceDetails: InvoiceDetail): Observable<void> {
    return this.http.post<void>(this.apiUrl, invoiceDetails);
  }

  updateInvoiceDetails(id: number, invoiceDetails: InvoiceDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, invoiceDetails);
  }
  getInvoiceDetails(): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(this.apiUrl);
  }

  getInvoiceDetail(id: number): Observable<InvoiceDetail> {
    return this.http.get<InvoiceDetail>(`${this.apiUrl}/${id}`);
  }

   // Método para obtener detalles de una factura específica
   getInvoiceDetailsByInvoiceId(invoiceId: number): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(`${this.apiUrl}/invoice/${invoiceId}`);
  }

}
